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
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userApi = UserApi();

  const refreshUserAvatar = async () => {
    try {
      setIsLoading(true);
      const result = await userApi.getUserProfile();
      if (result.success) {
        setUserAvatar(result.data.avatar_url);
        setUserName(result.data.name);
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

  const value = {
    userAvatar,
    userName,
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
