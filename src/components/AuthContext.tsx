import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem('userName');
  });

  const login = (name: string) => {
    setIsAuthenticated(true);
    setUserName(name);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    localStorage.setItem('userName', name);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUserName = localStorage.getItem('userName');
    if (savedAuth) {
      setIsAuthenticated(JSON.parse(savedAuth));
    }
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
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