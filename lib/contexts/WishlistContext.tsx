"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import WorkflowApi from '../api/Workflow';
import UserApi from '../api/User';

interface WishlistContextType {
  wishlistItems: string[]; // Array of workflow IDs in wishlist
  isLoading: boolean;
  addToWishlist: (workflowId: string) => Promise<{ success: boolean; error?: string }>;
  removeFromWishlist: (workflowId: string) => Promise<{ success: boolean; error?: string }>;
  isInWishlist: (workflowId: string) => boolean;
  toggleWishlist: (workflowId: string, currentIsLike: boolean) => Promise<{ success: boolean; error?: string }>;
  updateWishlistItem: (workflowId: string, isLiked: boolean) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const workflowApi = WorkflowApi();
  const userApi = UserApi();

  // Load wishlist on mount
  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setIsLoading(true);
      const result = await userApi.getMyWishlist();
      if (result.success) {
        // Extract workflow IDs from wishlist items
        const workflowIds = result.data.map((item: any) => item.id);
        setWishlistItems(workflowIds);
      }
    } catch (error) {
      // Error loading wishlist
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (workflowId: string) => {
    try {
      setIsLoading(true);
      const result = await workflowApi.addToWishlist(workflowId);
      
      if (result.success) {
        // Add to local state
        setWishlistItems(prev => [...prev, workflowId]);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: "Failed to add to wishlist" };
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (workflowId: string) => {
    try {
      setIsLoading(true);
      const result = await workflowApi.removeFromWishlist(workflowId);
      
      if (result.success) {
        // Remove from local state
        setWishlistItems(prev => prev.filter(id => id !== workflowId));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: "Failed to remove from wishlist" };
    } finally {
      setIsLoading(false);
    }
  };

  const isInWishlist = (workflowId: string) => {
    return wishlistItems.includes(workflowId);
  };

  const toggleWishlist = async (workflowId: string, currentIsLike: boolean) => {
    if (currentIsLike) {
      // Đã thích -> gỡ thích (remove)
      return await removeFromWishlist(workflowId);
    } else {
      // Chưa thích -> thích (add)
      return await addToWishlist(workflowId);
    }
  };

  const updateWishlistItem = (workflowId: string, isLiked: boolean) => {
    if (isLiked) {
      // Thêm vào wishlist nếu chưa có
      setWishlistItems(prev => prev.includes(workflowId) ? prev : [...prev, workflowId]);
    } else {
      // Xóa khỏi wishlist nếu có
      setWishlistItems(prev => prev.filter(id => id !== workflowId));
    }
  };

  const value: WishlistContextType = {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    updateWishlistItem,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
