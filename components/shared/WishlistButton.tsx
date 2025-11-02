"use client";

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { useWishlist } from '../../lib/contexts/WishlistContext';

interface WishlistButtonProps {
  workflowId: string;
  isLiked?: boolean; // Prop từ workflow detail
  className?: string;
}

export default function WishlistButton({ 
  workflowId, 
  isLiked = false,
  className = ""
}: WishlistButtonProps) {
  const { toggleWishlist, updateWishlistItem, isLoading } = useWishlist();
  const [isToggling, setIsToggling] = useState(false);
  const [currentIsLiked, setCurrentIsLiked] = useState(isLiked);

  // Cập nhật local state khi prop isLiked thay đổi
  useEffect(() => {
    setCurrentIsLiked(isLiked);
  }, [isLiked]);

  const handleToggle = async () => {
    if (isToggling || isLoading) return;
    
    // Cập nhật UI ngay lập tức (optimistic update)
    setCurrentIsLiked(!currentIsLiked);
    setIsToggling(true);
    
    try {
      const result = await toggleWishlist(workflowId, currentIsLiked);
      if (result.success) {
        // Cập nhật context sau khi thành công
        updateWishlistItem(workflowId, !currentIsLiked);
      } else {
        // Rollback nếu API fail
        setCurrentIsLiked(currentIsLiked);
      }
    } catch (error) {
      // Rollback nếu có lỗi
      setCurrentIsLiked(currentIsLiked);
    } finally {
      setIsToggling(false);
    }
  };
  const isDisabled = isToggling || isLoading;

  return (
    <Button
      onClick={handleToggle}
      disabled={isDisabled}
      className={`w-full ${
        currentIsLiked
          ? "bg-gradient-to-r from-[#FFB347] to-[#FFD580] text-white cursor-default opacity-60"
          : "bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#FF7A4A] hover:to-[#F9A847] text-white"
      } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {currentIsLiked ? (
        <span className="flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 fill-current" /> 
          In wishlist
        </span>
      ) : (
        "Add to wishlist"
      )}
      {isToggling && <span className="text-xs ml-2">...</span>}
    </Button>
  );
}
