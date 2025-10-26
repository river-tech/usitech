"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AuthApi from '../api/Auth';
import { useUser } from './UserContext';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const authApi = AuthApi();

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = authApi.getAuthToken();
      
      if (!token) {
        console.log('🔍 No token found');
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Check if token is expired
      if (authApi.isTokenExpired()) {
        console.log('⏰ Token expired, attempting refresh...');
        try {
          const refreshResult = await authApi.refreshToken();
          if (refreshResult.success) {
            console.log('✅ Token refreshed successfully');
            setIsAuthenticated(true);
          } else {
            console.log('❌ Token refresh failed:', refreshResult.error);
            authApi.clearTokens();
            setIsAuthenticated(false);
            setUser(null);
            return;
          }
        } catch (refreshError) {
          console.log('💥 Token refresh error:', refreshError);
          authApi.clearTokens();
          setIsAuthenticated(false);
          setUser(null);
          return;
        }
      } else {
        // Token is valid, set authenticated state
        console.log('✅ Token is valid');
        setIsAuthenticated(true);
      }
      
      // Optionally fetch user data here
      // const userResult = await userApi.getUserProfile();
      // if (userResult.success) {
      //   setUser(userResult.data);
      // }
      
    } catch (error) {
      console.log('💥 Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await authApi.login(email, password);
      
      if (result.success) {
        setIsAuthenticated(true);
        setUser(result.data);
        // Trigger custom event to refresh avatar
        window.dispatchEvent(new Event('userLogin'));
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Login failed' };
      }
    } catch (error) {
      console.log('Login error:', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authApi.clearTokens();
    setIsAuthenticated(false);
    setUser(null);
    // Trigger custom event to clear avatar
    window.dispatchEvent(new Event('userLogout'));
    router.push('/auth/login');
  };

  // Check auth on mount and when pathname changes
  useEffect(() => {
    checkAuth();
  }, [pathname]);

  // Auto-redirect for protected routes
  useEffect(() => {
    if (!isLoading) {
      const protectedRoutes = ['/dashboard', '/profile', '/settings'];
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
      
      if (isProtectedRoute && !isAuthenticated) {
        router.push('/auth/login');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
