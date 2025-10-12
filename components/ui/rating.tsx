"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  showLabel?: boolean;
}

export function Rating({ 
  value, 
  onChange, 
  max = 5, 
  size = "md", 
  disabled = false,
  showLabel = true 
}: RatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  const handleClick = (rating: number) => {
    if (!disabled) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!disabled) {
      setHoveredRating(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoveredRating(0);
    }
  };

  const getRatingText = (rating: number) => {
    const texts = {
      1: "Poor",
      2: "Fair", 
      3: "Good",
      4: "Very Good",
      5: "Excellent"
    };
    return texts[rating as keyof typeof texts] || "";
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: max }, (_, i) => {
          const rating = i + 1;
          const isActive = rating <= (hoveredRating || value);
          
          return (
            <button
              key={rating}
              type="button"
              onClick={() => handleClick(rating)}
              onMouseEnter={() => handleMouseEnter(rating)}
              onMouseLeave={handleMouseLeave}
              disabled={disabled}
              className={cn(
                "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:ring-offset-1 rounded-sm",
                disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-110"
              )}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  isActive 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-gray-300 hover:text-yellow-300"
                )}
              />
            </button>
          );
        })}
      </div>
      
      {showLabel && value > 0 && (
        <span className="text-sm text-gray-600 font-medium">
          {getRatingText(value)}
        </span>
      )}
    </div>
  );
}
