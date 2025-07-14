// context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';




// generic user type
interface User {
  id?: string;
  name?: string;
  [key: string]: string | undefined; // extra fields
}

// generic auth result
interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
}

//create type for credentials depending on auth-method
interface AuthCredentials {
  [key: string]: string | number | boolean | undefined;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (credentials: AuthCredentials) => Promise<void>; 
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setAuthConfig: (config: AuthConfig) => void;
}



interface AuthConfig {
  endpoints?: {
    login?: string;
    logout?: string;
    status?: string;
  };
  // overridable callbacks
  onLogin?: (credentials: AuthCredentials) => Promise<AuthResult>; 
  onLogout?: () => Promise<void>; 
  onCheckAuth?: () => Promise<{ authenticated: boolean; user?: User }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// default cookie auth setup
const defaultAuthConfig: AuthConfig = {
  endpoints: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',  
    status: '/api/auth/status'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [authConfig, setAuthConfig] = useState<AuthConfig>(defaultAuthConfig);

  // Default checkAuth 
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // checkAuth
      if (authConfig.onCheckAuth) {
        const result = await authConfig.onCheckAuth();
        setIsAuthenticated(result.authenticated);
        setUser(result.user || null);
        return;
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }


    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [authConfig]);

  // Login
  const login = async (credentials: AuthCredentials) => {
    try {
      setIsLoading(true);

      // Login
      if (authConfig.onLogin) {
        const result = await authConfig.onLogin(credentials);
        if (result.success) {
          await checkAuth();
        } else {
          throw new Error(result.message || 'Login failed');
        }
        return;
      }

    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      // Logout
      if (authConfig.onLogout) {
        await authConfig.onLogout();
      } 

      setIsAuthenticated(false);
      setUser(null);

    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // initial auth check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        checkAuth,
        setAuthConfig,
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