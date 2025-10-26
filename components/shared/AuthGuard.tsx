"use client";

import React, { useEffect } from 'react';
import { useAuth } from '../../lib/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth/login' 
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        // Redirect to login if authentication is required but user is not authenticated
        router.push(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        // Redirect to dashboard if user is authenticated but trying to access public routes
        const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password'];
        if (publicRoutes.includes(pathname)) {
          router.push('/dashboard');
        }
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router, pathname]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render children if authentication check fails
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Don't render children if user is authenticated but trying to access auth pages
  if (!requireAuth && isAuthenticated) {
    const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password'];
    if (publicRoutes.includes(pathname)) {
      return null;
    }
  }

  return <>{children}</>;
}
