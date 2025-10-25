"use client";

import { useEffect, useRef } from "react";
import AuthApi from "../../lib/api/Auth";

interface AutoRefreshTokenProps {
  children: React.ReactNode;
}

export default function AutoRefreshToken({ children }: AutoRefreshTokenProps) {
  const authApi = AuthApi();
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef<boolean>(false);

  const checkAndRefreshToken = async () => {
    // Skip if already refreshing
    if (isRefreshingRef.current) return;
    
    // Skip if no token
    const token = authApi.getAuthToken();
    if (!token) return;

    // Check if token is expired or will expire in next 2 minutes
    const remaining = authApi.getTokenTimeRemaining();
    if (remaining > 120) return; // More than 2 minutes left

    // Start refresh process
    isRefreshingRef.current = true;
    
    try {
      console.log('Token expiring soon, refreshing...');
      const success = await authApi.refreshToken();
      
      if (success) {
        console.log('Token refreshed successfully');
      } else {
        console.log('Token refresh failed, redirecting to login');
        authApi.clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    } catch (error) {
      console.log('Error refreshing token:', error);
      authApi.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } finally {
      isRefreshingRef.current = false;
    }
  };

  useEffect(() => {
    // Check token status immediately
    checkAndRefreshToken();

    // Set up interval to check every 30 seconds
    refreshIntervalRef.current = setInterval(checkAndRefreshToken, 30000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  return <>{children}</>;
}
