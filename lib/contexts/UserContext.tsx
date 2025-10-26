"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import UserApi from '../api/User';

interface UserContextType {
  userAvatar: string | null;
  setUserAvatar: (avatar: string | null) => void;
  refreshUserAvatar: () => Promise<void>;
  isLoading: boolean;
  userName: string | null;
  setUserName: (name: string | null) => void;
  userEmail : string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userApi = UserApi();

  const refreshUserAvatar = async () => {
    try {
      setIsLoading(true);
      const result = await userApi.getUserProfile();
      if (result.success) {
        setUserAvatar(result.data.avatar_url);
        setUserName(result.data.name);
        setUserEmail(result.data.email);
      }
    } catch (error) {
      console.log('Failed to fetch user avatar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Always fetch from API on mount to get latest avatar
    refreshUserAvatar();
  }, []);

  // Listen for storage events (when user logs in/out in another tab or after login)
  useEffect(() => {
    const handleLogin = () => {
      // Refresh avatar when login happens
      refreshUserAvatar();
    };

    const handleLogout = () => {
      // Clear avatar when logout happens
      setUserAvatar(null);
      setUserName(null);
      setUserEmail(null);
    };

    const handleStorageChange = () => {
      // Refresh avatar when login/logout happens
      refreshUserAvatar();
    };

    // Listen for custom events from login/logout
    window.addEventListener('userLogin', handleLogin);
    window.addEventListener('userLogout', handleLogout);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('userLogin', handleLogin);
      window.removeEventListener('userLogout', handleLogout);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Refresh avatar when window gains focus (user comes back to tab after logging in elsewhere)
  useEffect(() => {
    const handleFocus = () => {
      refreshUserAvatar();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const value = {
    userAvatar,
    userName,
    userEmail,
    setUserAvatar,
    setUserName,
    refreshUserAvatar,
    isLoading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
