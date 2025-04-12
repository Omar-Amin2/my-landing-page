'use client'
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const value = {
    loggedIn,
    setLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
