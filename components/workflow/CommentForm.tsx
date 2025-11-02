"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { Send, Star } from "lucide-react";
import Cookies from "js-cookie";
import { useAuth } from "@/lib/contexts/AuthContext";
interface CommentFormProps {
  onSubmit: (content: string, rating?: number) => void;
  isLoading?: boolean;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState("");
  const {isAuthenticated} = useAuth();
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAuthed(isAuthenticated);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim(), rating > 0 ? rating : undefined);
      setContent("");
      setRating(0);
    } catch (error) {
      // Error submitting comment
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
        <p className="text-blue-700 text-sm">
          Please log in to comment and discuss with the community
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start gap-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-[#007BFF] text-white text-sm">
            U
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          {/* Rating Section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Rate this workflow:</span>
            </div>
            <Rating
              value={rating}
              onChange={setRating}
              size="sm"
              showLabel={false}
            />
          </div>
          
          {/* Comment Input */}
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts about this workflow..."
            className="min-h-[80px] resize-none border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]"
            disabled={isSubmitting}
          />
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {content.length}/500 characters
            </span>
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              size="sm"
              className="bg-[#007BFF] hover:bg-[#0056CC] text-white"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-1" />
                  Post Comment
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
