"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AuthApi from '../../lib/api/Auth';

export default function AutoRefreshToken() {
  const authApi = AuthApi();
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);

  const scheduleTokenRefresh = () => {
    // Clear existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    const token = authApi.getAuthToken();
    if (!token) return;

    // Check if token is expired
    if (authApi.isTokenExpired()) {
      handleTokenRefresh();
      return;
    }

    // Schedule refresh every 10 minutes (600 seconds)
    const refreshTime = 10 * 60 * 1000; // 10 minutes in milliseconds
    
    refreshTimeoutRef.current = setTimeout(() => {
      handleTokenRefresh();
    }, refreshTime);
  };

  const handleTokenRefresh = async () => {
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
    } catch (error) {
      // Don't redirect immediately - might be network error
      // Try again in next cycle
      scheduleTokenRefresh();
    } finally {
      isRefreshingRef.current = false;
    }
  };


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
  }, []);

  // Listen for storage changes (token updates from other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token' || e.key === 'token_expires_at') {
        scheduleTokenRefresh();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
  }, []);

  return null; // This component doesn't render anything
}