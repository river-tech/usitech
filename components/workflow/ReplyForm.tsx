"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, X } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";

interface ReplyFormProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function ReplyForm({ 
  onSubmit, 
  onCancel, 
  placeholder = "Write a reply..."
}: ReplyFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAuthed(isAuthenticated());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim());
      setContent("");
    } catch (error) {
      console.log("Error submitting reply:", error);
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
          Please log in to reply to comments
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="flex items-start gap-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-[#007BFF] text-white text-sm">
            U
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="min-h-[60px] resize-none border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]"
            disabled={isSubmitting}
            autoFocus
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {content.length}/300 characters
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancel}
                disabled={isSubmitting}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
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
                    Post Reply
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
