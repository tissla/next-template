'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { checkAuthStatus, login, logout as authLogout } from '@/lib/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string } | null;
  login: (phone: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const checkAuth = async () => {
    const result = await checkAuthStatus();
    setIsAuthenticated(result.verified);
    setUser(result.verified ? { name: result.name } : null);
  };

  const handleLogin = async (phone: string, code: string) => {
    await login(phone, code);
    await checkAuth();
  };

  const handleLogout = async () => {
    await authLogout();
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login: handleLogin,
        logout: handleLogout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
