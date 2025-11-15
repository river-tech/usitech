import AuthApi from "./Auth";

const WorkflowApi = () => {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const authApi = AuthApi();

  // 12. Get All Workflows
  const getAllWorkflows = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, data: data };
      } else {
        return { success: false, error: data.detail || data.message || data.error || "Error fetching workflows" };
      }
    } catch (error) {
      throw error;
    }
  };

  // 13. Get Featured Workflows
  const getFeaturedWorkflows = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/feature`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, data: data };
      } else {
        return { success: false, error: data.detail || data.message || data.error || "Error fetching featured workflows" };
      }
    } catch (error) {
      throw error;
    }
  };

  // 14. Get Related Workflows
  const getRelatedWorkflows = async (workflow_id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/${workflow_id}/related`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, data: data };
      } else {
        return { success: false, error: data.detail || data.message || data.error || "Error fetching related workflows" };
      }
    } catch (error) {
      throw error;
    }
  };

  // 15. Get My Purchased Workflows
  const getMyWorkflows = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/my-workflow`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, data: data };
      } else {
        return { success: false, error: data.detail || data.message || data.error || "Error fetching my workflows" };
      }
    } catch (error) {
      throw error;
    }
  };

  // 16. Get Workflow Detail
  const getWorkflowDetail = async (workflow_id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/${workflow_id}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, data: data };
      } else {
        return { success: false, error: data.detail || data.message || data.error || "Error fetching workflow detail" };
      }
    } catch (error) {
      throw error;
    }
  };

  // 17. Search Workflows
  // const searchWorkflows = async (q = "", category = "") => {
  //   try {
  //     const params = new URLSearchParams();
  //     if (q) params.append("q", q);
  //     if (category) params.append("category", category);

  //     const response = await fetch(`${API_BASE_URL}/api/workflows/search?${params.toString()}`, {
  //       method: "GET",
  //       headers: {
  //         "Accept": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       return { success: true, data: data };
  //     } else {
  //       return { success: false, error: data.detail || data.message || data.error || "Error searching workflows" };
  //     }
  //   } catch (error) {
  //     console.log("Error searching workflows:", error);
  //     throw error;
  //   }
  // };

  // 18. Add to Wishlist
  const addToWishlist = async (workflow_id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/${workflow_id}/wishlist`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) return { success: true, data };
      return { success: false, error: data.detail || data.message || data.error || "Error adding to wishlist" };
    } catch (error) {
      throw error;
    }
  };

  // 19. Remove from Wishlist
  const removeFromWishlist = async (workflow_id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/${workflow_id}/wishlist`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) return { success: true, data };
      return { success: false, error: data.detail || data.message || data.error || "Error removing from wishlist" };
    } catch (error) {
      throw error;
    }
  };

  // 20. Create Workflow Review
  const createReview = async (workflow_id: string, rating: number, comment = "", parent_comment_id?: string) => {
    try {
      const body: { rating: number; comment: string; parent_comment_id?: string } = { rating, comment };
      if (parent_comment_id) body.parent_comment_id = parent_comment_id;

      const response = await fetch(`${API_BASE_URL}/api/workflows/${workflow_id}/reviews`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) return { success: true, data };
      return { success: false, error: data.detail || data.message || data.error || "Error creating review" };
    } catch (error) {
      throw error;
    }
  };

  // 21. Delete Workflow Review
  const deleteReview = async (review_id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/reviews/${review_id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) return { success: true, data };
      return { success: false, error: data.detail || data.message || data.error || "Error deleting review" };
    } catch (error) {
      throw error;
    }
  };

  // 22. Get Workflow Reviews
  const getWorkflowReviews = async (workflow_id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/${workflow_id}/reviews`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) return { success: true, data };
      return { success: false, error: data.detail || data.message || data.error || "Error fetching reviews" };
    } catch (error) {
      throw error;
    }
  };

  // 23. Get Workflow Full Detail (auth required)
  const getWorkflowFullDetail = async (workflow_id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/detail/${workflow_id}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) return { success: true, data };
      return { success: false, error: data.detail || data.message || data.error || "Error fetching full workflow detail" };
    } catch (error) {
      throw error;
    }
  };

  const orderWorkflow = async (workflow_id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/wallet/orders/${workflow_id}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) return { success: true, data };
      return { success: false, error: data.detail || data.message || data.error || "Error ordering workflow" };
    } catch (error) {
      throw error;
    }
  }

  const getInvoice = async (order_id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${order_id}/invoice`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) return { success: true, data };
      return { success: false, error: data.detail || data.message || data.error || "Error fetching invoice" };
    } catch (error) {
      throw error;
    }
  }

  

  return {
    orderWorkflow,
    getAllWorkflows,
    getFeaturedWorkflows,
    getRelatedWorkflows,
    getMyWorkflows,
    getWorkflowDetail,
    getInvoice,
    // searchWorkflows,
    addToWishlist,
    removeFromWishlist,
    createReview,
    deleteReview,
    getWorkflowReviews,
    getWorkflowFullDetail,
  };
};

export default WorkflowApi;
