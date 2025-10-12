"use client";
import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { mockComments, MockComment } from "@/lib/mock-data";
import { MessageCircle, Users } from "lucide-react";

interface CommentsSectionProps {
  workflowId: string;
}

export default function CommentsSection({ workflowId }: CommentsSectionProps) {
  // workflowId will be used for future API calls
  console.log("Comments for workflow:", workflowId);
  const [comments, setComments] = useState<MockComment[]>(mockComments);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitComment = async (content: string, rating?: number) => {
    const newComment: MockComment = {
      id: Date.now().toString(),
      author: {
        name: "You",
      },
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      rating,
    };

    setComments(prev => [newComment, ...prev]);
  };

  const handleLike = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => {
        // Check if it's a main comment
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        // Check if it's a reply to main comment
        if (comment.replies) {
          const updatedReplies = comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                isLiked: !reply.isLiked
              };
            }
            // Check if it's a nested reply
            if (reply.replies) {
              const updatedNestedReplies = reply.replies.map(nestedReply => {
                if (nestedReply.id === commentId) {
                  return {
                    ...nestedReply,
                    likes: nestedReply.isLiked ? nestedReply.likes - 1 : nestedReply.likes + 1,
                    isLiked: !nestedReply.isLiked
                  };
                }
                return nestedReply;
              });
              if (updatedNestedReplies.some(nestedReply => nestedReply.id === commentId)) {
                return {
                  ...reply,
                  replies: updatedNestedReplies
                };
              }
            }
            return reply;
          });
          if (updatedReplies.some(reply => reply.id === commentId)) {
            return {
              ...comment,
              replies: updatedReplies
            };
          }
        }
        return comment;
      })
    );
  };

  const handleReply = async (commentId: string, content: string) => {
    const newReply: MockComment = {
      id: `reply-${Date.now()}`,
      author: {
        name: "You",
      },
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    setComments(prev => 
      prev.map(comment => {
        // Check if it's a main comment
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        // Check if it's a reply to a main comment
        if (comment.replies) {
          const updatedReplies = comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                replies: [...(reply.replies || []), newReply]
              };
            }
            return reply;
          });
          if (updatedReplies.some(reply => reply.replies?.length !== comment.replies?.find(r => r.id === reply.id)?.replies?.length)) {
            return {
              ...comment,
              replies: updatedReplies
            };
          }
        }
        return comment;
      })
    );
  };

  const handleDelete = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => {
        // Check if it's a main comment
        if (comment.id === commentId) {
          return null; // Will be filtered out
        }
        // Check if it's a reply to main comment
        if (comment.replies) {
          const updatedReplies = comment.replies.map(reply => {
            // Check if it's the reply to delete
            if (reply.id === commentId) {
              return null; // Will be filtered out
            }
            // Check if it's a nested reply
            if (reply.replies) {
              const updatedNestedReplies = reply.replies.filter(nestedReply => nestedReply.id !== commentId);
              if (updatedNestedReplies.length !== reply.replies.length) {
                return {
                  ...reply,
                  replies: updatedNestedReplies
                };
              }
            }
            return reply;
          }).filter(reply => reply !== null);
          
          if (updatedReplies.length !== comment.replies.length) {
            return {
              ...comment,
              replies: updatedReplies
            };
          }
        }
        return comment;
      }).filter(comment => comment !== null)
    );
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading more comments
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const totalComments = comments.length;
  const totalReplies = comments.reduce((acc, comment) => acc + (comment.replies?.length || 0), 0);
  const totalInteractions = totalComments + totalReplies;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#06B6D4] rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Comments</h3>
              <p className="text-sm text-gray-600">
                {totalComments} comments • {totalReplies} replies
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{totalInteractions} interactions</span>
          </div>
        </div>

        {/* Comment Form */}
        <CommentForm onSubmit={handleSubmitComment} />
      </div>

      {/* Comments List */}
      <div className="p-6">
        <CommentList
          comments={comments}
          onLike={handleLike}
          onReply={handleReply}
          onDelete={handleDelete}
          showLoadMore={comments.length > 5}
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
          currentUserId="current-user"
        />
      </div>
    </div>
  );
}
