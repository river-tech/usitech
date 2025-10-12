"use client";
import { useState, useEffect } from "react";
import CommentCard, { Comment } from "./CommentCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CommentListProps {
  comments: Comment[];
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => void;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
  currentUserId?: string;
}

export default function CommentList({ 
  comments, 
  onLike, 
  onReply, 
  onDelete,
  showLoadMore = false,
  onLoadMore,
  isLoading = false,
  currentUserId = "current-user"
}: CommentListProps) {
  // currentUserId will be used for future user identification
  console.log("Current user ID:", currentUserId);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest");
  const [showAll, setShowAll] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "popular":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const displayedComments = showAll ? sortedComments : sortedComments.slice(0, 6);

  if (!mounted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">💬</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading...</h3>
        <p className="text-gray-600">Please wait a moment</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">💬</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No comments yet</h3>
        <p className="text-gray-600">Be the first to share your thoughts about this workflow!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "popular")}
            className="text-sm border text-black focus:outline-none border-gray-200 rounded-lg px-3 py-1 focus:border-[#007BFF] "
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
        
        {comments.length > 6 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-[#007BFF] hover:text-[#0056CC]"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                View all ({comments.length})
              </>
            )}
          </Button>
        )}
      </div>

      {/* Comments */}
      <div className="space-y-4">
        {displayedComments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onLike={onLike}
            onReply={onReply}
            onDelete={onDelete}
            isOwnComment={comment.author.name === "You" || comment.author.name === "current-user"}
          />
        ))}
      </div>

      {/* Load More */}
    
    </div>
  );
}
