import AuthApi from "./Auth";
const CommentApi = () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const authApi = AuthApi();
    const getComments = async (workflowId: string) => {
        try {
            const token = authApi.getAuthToken();
            
            // Nếu có token, gọi endpoint authenticated để có thông tin ownership
            if (token) {
                const response = await fetch(`${API_BASE_URL}/api/workflows/${workflowId}/reviews/me`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    return { success: true, data };
                }
            }
            
            // Fallback: gọi endpoint public nếu không có token hoặc authenticated endpoint thất bại
            const response = await fetch(`${API_BASE_URL}/api/workflows/${workflowId}/reviews`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, error: data.detail || data.message || data.error || "Error getting comments" };
            }

        } catch (error) {
            throw error;
        }
    }

    const createComment = async (workflowId: string, parent_comment_id?: string, rating?: number, content?: string) => {
        try {
            const requestBody = {
                parent_comment_id,
                rating,
                content
            };
            
            const response = await fetch(`${API_BASE_URL}/api/workflows/${workflowId}/reviews`, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authApi.getAuthToken()}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, error: data.detail || data.message || data.error || "Error creating comment" };
            }
        } catch (error) {
            throw error;
        }
    }

   
    const deleteComment = async (commentId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/workflows/reviews/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authApi.getAuthToken()}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, error: data.detail || data.message || data.error || "Error deleting comment" };
            }
        } catch (error) {
            throw error;
        }
    }

    return {
        getComments,
        createComment,
        deleteComment,
    }
}

export default CommentApi;