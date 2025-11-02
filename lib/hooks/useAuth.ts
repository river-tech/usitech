"use client";

import { useAuth } from '../contexts/AuthContext';

/**
 * Hook to check if user is authenticated
 * @returns boolean - true if user is authenticated
 */
export function useIsAuthenticated() {
  const { isAuthenticated, isLoading } = useAuth();
  return { isAuthenticated, isLoading };
}

/**
 * Hook to get current user
 * @returns user object or null
 */
export function useCurrentUser() {
  const { user, isLoading } = useAuth();
  return { user, isLoading };
}

/**
 * Hook for authentication actions
 * @returns login, logout, checkAuth functions
 */
export function useAuthActions() {
  const { login, logout, checkAuth } = useAuth();
  return { login, logout, checkAuth };
}
