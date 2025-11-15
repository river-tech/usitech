"use client";

import { useCallback, useEffect, useMemo, useRef } from 'react';
import AuthApi from '../../lib/api/Auth';

export default function AutoRefreshToken() {
  const authApi = useMemo(() => AuthApi(), []);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);
  const handleTokenRefreshRef = useRef<() => void>(() => {});

  const scheduleTokenRefresh = useCallback(() => {
    // Clear existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    const token = authApi.getAuthToken();
    if (!token) return;

    // Check if token is expired
    if (authApi.isTokenExpired()) {
      handleTokenRefreshRef.current?.();
      return;
    }

    // Schedule refresh every 10 minutes (600 seconds)
    const refreshTime = 10 * 60 * 1000; // 10 minutes in milliseconds
    
    refreshTimeoutRef.current = setTimeout(() => {
      handleTokenRefreshRef.current?.();
    }, refreshTime);
  }, [authApi]);

  const handleTokenRefresh = useCallback(async () => {
    if (isRefreshingRef.current) {
      return;
    }

    isRefreshingRef.current = true;
    
    try {
      const result = await authApi.refreshToken();
      
      if (result.success) {
        // Schedule next refresh in 10 minutes
        scheduleTokenRefresh();
      } else {
        // Don't redirect immediately - refresh token might still be valid
        // Try again in next cycle
        scheduleTokenRefresh();
      }
    } catch {
      // Don't redirect immediately - might be network error
      // Try again in next cycle
      scheduleTokenRefresh();
    } finally {
      isRefreshingRef.current = false;
    }
  }, [authApi, scheduleTokenRefresh]);

  useEffect(() => {
    handleTokenRefreshRef.current = () => {
      void handleTokenRefresh();
    };
  }, [handleTokenRefresh]);


  // Check token status on mount
  useEffect(() => {
    const checkInitialToken = () => {
      const token = authApi.getAuthToken();
      if (token) {
        if (authApi.isTokenExpired()) {
          handleTokenRefresh();
        } else {
          scheduleTokenRefresh();
        }
      }
    };

    checkInitialToken();

    // Cleanup on unmount
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [authApi, handleTokenRefresh, scheduleTokenRefresh]);

  // Listen for storage changes (token updates from other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token' || e.key === 'token_expires_at') {
        scheduleTokenRefresh();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [scheduleTokenRefresh]);

  // Listen for focus events (user returns to tab)
  useEffect(() => {
    const handleFocus = () => {
      const token = authApi.getAuthToken();
      if (token && authApi.isTokenExpired()) {
        handleTokenRefresh();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [authApi, handleTokenRefresh]);

  return null; // This component doesn't render anything
}
