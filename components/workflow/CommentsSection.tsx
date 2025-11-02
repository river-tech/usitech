"use client";
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import CommentApi from "@/lib/api/Comment";
import { MessageCircle, Users } from "lucide-react";
import { Review } from "@/lib/models/Reviews";

interface CommentsSectionProps {
  workflowId: string;
}

export default function CommentsSection({ workflowId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const commentApi = CommentApi();

  // Load comments on mount
  useEffect(() => {
    loadComments();
  }, [workflowId]);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await commentApi.getComments(workflowId);
      
      if (result.success) {
        // Sắp xếp comments theo cấu trúc cha-con
        const sortedComments = organizeCommentsByParent(result.data || []);
        setComments(sortedComments);
      } else {
        setError(result.error || "Failed to load comments");
      }
    } catch (error) {
      setError("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm sắp xếp comments theo cấu trúc cha-con
  const organizeCommentsByParent = (comments: Review[]): Review[] => {
    const commentMap = new Map<string, Review>();
    const rootComments: Review[] = [];

    // Tạo map để dễ tìm kiếm - KHÔNG tạo replies array mới
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment });
    });

    // Sắp xếp theo cấu trúc cha-con
    comments.forEach(comment => {
      if (comment.parent_comment_id) {
        // Đây là reply, thêm vào replies của comment cha
        const parentComment = commentMap.get(comment.parent_comment_id);
        if (parentComment) {
          if (!parentComment.replies) {
            parentComment.replies = [];
          }
          parentComment.replies.push(comment);
        }
      } else {
        // Đây là comment gốc - lấy từ map để có thể có replies
        const rootComment = commentMap.get(comment.id);
        if (rootComment) {
          rootComments.push(rootComment);
        }
      }
    });

    return rootComments;
  };

  const handleSubmitComment = async (content: string, rating?: number) => {
    try {
      const result = await commentApi.createComment(workflowId, undefined, rating, content);
      
      if (result.success) {
        // Thêm comment mới vào đầu danh sách và sắp xếp lại
        loadComments();
      }
    } catch (error) {
      // Error creating comment
    }
  };

 

  const handleReply = async (commentId: string, content: string) => {
    try {
      const result = await commentApi.createComment(workflowId, commentId, undefined, content);
      
      if (result.success) {
        // Thêm reply trực tiếp vào comment cha thay vì sắp xếp lại toàn bộ
        // const newReply = result.data;
        // setComments(prev => 
        //   prev.map(comment => {
        //     if (comment.id === commentId) {
        //       return {
        //         ...comment,
        //         replies: [...(comment.replies || []), newReply]
        //       };
        //     }
        //     // Tìm trong nested replies
        //     if (comment.replies) {
        //       const updatedReplies = comment.replies.map(reply => {
        //         if (reply.id === commentId) {
        //           return {
        //             ...reply,
        //             replies: [...(reply.replies || []), newReply]
        //           };
        //         }
        //         return reply;
        //       });
        //       if (updatedReplies.some(reply => reply.id === commentId)) {
        //         return {
        //           ...comment,
        //           replies: updatedReplies
        //         };
        //       }
        //     }
        //     return comment;
        //   })
        // );
        loadComments();
      }
    } catch (error) {
      // Error creating reply
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const result = await commentApi.deleteComment(commentId);
      
      if (result.success) {
        // Xóa comment khỏi state và sắp xếp lại
        loadComments();
      }
    } catch (error) {
      // Error deleting comment
    }
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading more comments
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const totalComments = comments.length;

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
                {totalComments} comments
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{totalComments} interactions</span>
          </div>
        </div>

        {/* Comment Form */}
        <CommentForm onSubmit={handleSubmitComment} />
      </div>

      {/* Comments List */}
      <div className="p-6">
        {error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
          </div>
        ) : (
          <CommentList
            comments={comments as Review[]}
            onReply={handleReply}
            onDelete={handleDelete}
            showLoadMore={comments.length > 5}
            onLoadMore={handleLoadMore}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
