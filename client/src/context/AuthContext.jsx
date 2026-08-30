import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('helpdesk_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth State on App mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await authApi.getMe();
        if (res.data?.user) {
          setUser(res.data.user);
          setCompany(res.data.user.companyId || null);
        }
      } catch (err) {
        console.warn('Authentication token expired or invalid');
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [token]);

  const saveAuthData = (tokenValue, userData) => {
    localStorage.setItem('helpdesk_token', tokenValue);
    setToken(tokenValue);
    setUser(userData);
    if (userData && userData.companyId) {
      setCompany(userData.companyId);
    }
  };

  const logout = () => {
    localStorage.removeItem('helpdesk_token');
    setToken(null);
    setUser(null);
    setCompany(null);
  };

  const refreshUser = async () => {
    try {
      const res = await authApi.getMe();
      if (res.data?.user) {
        setUser(res.data.user);
        setCompany(res.data.user.companyId || null);
      }
    } catch (err) {
      console.error('Failed to refresh user auth state:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        token,
        loading,
        saveAuthData,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
