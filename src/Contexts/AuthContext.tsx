// AuthContext.tsx

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get('authToken'));

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    Cookies.set('accessToken', token, { expires: 7 }); // Store token in cookies for 7 days
    setIsAuthenticated(true);
    window.location.href = '/';
  };

  const logout = () => {
    Cookies.remove('accessToken');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
