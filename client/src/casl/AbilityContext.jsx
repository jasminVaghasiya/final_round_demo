import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { defineAbilityFor } from './defineAbility';

export const AbilityContext = createContext();

export const AbilityProvider = ({ children }) => {
  const { user } = useAuth();

  const ability = useMemo(() => {
    return defineAbilityFor(user);
  }, [user]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => {
  const context = useContext(AbilityContext);
  if (!context) {
    throw new Error('useAbility must be used within an AbilityProvider');
  }
  return context;
};
