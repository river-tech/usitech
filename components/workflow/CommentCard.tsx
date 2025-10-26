"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Reply, MoreHorizontal, Star } from "lucide-react";
import { useState, useEffect } from "react";
import ReplyForm from "./ReplyForm";
import { Review } from "@/lib/models/Reviews";



interface CommentCardProps {
  comment: Review;
  onReply?: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => void;
  showReplies?: boolean;
  isNestedReply?: boolean;
  parentCommentId?: string;
}

export default function CommentCard({ 
  comment, 
  onReply, 
  onDelete,
  showReplies = true,
  isNestedReply = false,
  parentCommentId: _parentCommentId // eslint-disable-line @typescript-eslint/no-unused-vars
}: CommentCardProps) {
  const [mounted, setMounted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Debug logging
    console.log("CommentCard - comment.is_me:", comment.is_me);
    console.log("CommentCard - onDelete:", !!onDelete);
    console.log("CommentCard - comment:", comment);
  }, []);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(comment.id);
    }
    setShowDeleteModal(false);
  };

  const handleReplyClick = () => {
    setShowReplyForm(true);
  };

  const handleReplySubmit = async (content: string) => {
    if (onReply) {
      await onReply(comment.id, content);
      
    }
    setShowReplyForm(false);
  };

  const handleReplyCancel = () => {
    setShowReplyForm(false);
  };

  const formatTimeAgo = (dateString: string) => {
    if (!mounted) return "Loading...";
    
    if (!dateString) return "Just now";
    
    const date = new Date(dateString);
    
    // Kiểm tra nếu date không hợp lệ
    if (isNaN(date.getTime())) {
      console.log("Invalid date string:", dateString);
      return "Just now";
    }
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarFallback className="bg-gradient-to-br from-[#007BFF] to-[#06B6D4] text-white font-semibold">
            {comment.user?.avatar_url}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-900">{comment.user?.name}</h4>
            {comment.rating && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < comment.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-600 font-medium ml-1">
                  {comment.rating}/5
                </span>
              </div>
            )}
            <span className="text-sm text-gray-500">{formatTimeAgo(comment.created_at)}</span>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-3">{comment.comment}</p>
          
          <div className="flex items-center gap-4">
            {onReply && !comment.parent_comment_id && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReplyClick}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#007BFF] transition-all duration-200"
              >
                <Reply className="w-4 h-4" />
                Reply
              </Button>
            )}
            
            {onDelete && (comment.is_me) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeleteClick}
                className="text-gray-400 hover:text-red-500"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Reply Form */}
          {showReplyForm && (
            <ReplyForm
              onSubmit={handleReplySubmit}
              onCancel={handleReplyCancel}
              placeholder={`Reply to ${comment.user?.name}...`}
            />
          )}

          {/* Replies */}
          {showReplies && comment.replies && comment.replies.length > 0 && (
            <div className={`mt-4 space-y-3 ${isNestedReply ? 'pl-2' : 'pl-4 border-l-2 border-gray-100'}`}>
              {comment.replies.map((reply, index) => (
                <CommentCard
                  key={index}
                  comment={reply as Review}
                  onReply={onReply}
                  onDelete={onDelete}
                  showReplies={true}
                  isNestedReply={true}
                  parentCommentId={comment.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className={`
              bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl
              transition-all duration-300 transform
              animate-[popupShow_0.24s_ease]
            `}
            style={{
              // for fallback if animate not work, use scale/opacity
              animation: "popupShow 0.24s cubic-bezier(0.36,0.66,0.04,1) forwards"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center animate-fadeIn">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Comment
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Are you sure you want to delete this comment? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 transition-all duration-200"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleConfirmDelete}
                  className="flex-1 transition-all duration-200"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <style jsx global>{`
            @keyframes popupShow {
              0% {
                opacity: 0;
                transform: scale(0.92) translateY(10px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.35s ease;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: scale(0.9);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
