import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="center-content">
        <div className="spinner" style={{ width: 40, height: 40 }} />
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Account status redirection rules (Rules 6, 7, 8)
  if (user.status === 'PENDING' && location.pathname !== '/join-company/pending') {
    return <Navigate to="/join-company/pending" replace />;
  }

  if (user.status === 'REJECTED' || user.status === 'SUSPENDED') {
    return <Navigate to="/login" replace />;
  }

  // Role authorization guard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const PublicOnlyRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="center-content">
        <div className="spinner" style={{ width: 40, height: 40 }} />
      </div>
    );
  }

  if (token && user) {
    if (user.status === 'PENDING') {
      return <Navigate to="/join-company/pending" replace />;
    }
    if (user.status === 'ACTIVE') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};
