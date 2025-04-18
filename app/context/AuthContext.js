'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
  user: null,
});

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setLoggedIn(JSON.parse(storedAuth));
    }
  }, []);

  const handleLogin = (value) => {
    setLoggedIn(value);
    localStorage.setItem('auth', JSON.stringify(value));
  };

  const value = {
    loggedIn,
    setLoggedIn: handleLogin,
    user: loggedIn ? { name: 'Omar' } : null,
  };

  if (!isClient) {
    return null;
  }

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
