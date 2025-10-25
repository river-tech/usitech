import AuthApi from "./Auth";
const UserApi = () => {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const authApi = AuthApi();
  const getUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          error:
            data.detail ||
            data.message ||
            data.error ||
            "Error getting user profile",
        };
      }
    } catch (error) {
      console.log("Error getting user profile:", error);
      throw error;
    }
  };
  const updateUserProfile = async (
    name: string,
    avatar_url: string
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
        body: JSON.stringify({ name, avatar_url }),
      });
      const data = await response.json();
      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          error:
            data.detail ||
            data.message ||
            data.error ||
            "Error updating user profile",
        };
      }
    } catch (error) {
      console.log("Error updating user profile:", error);
      throw error;
    }
  };
  const getDashboardUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return {
          success: true,
          data: data.data,
        };
      } else {
        return {
          success: false,
          error:
            data.detail ||
            data.message ||
            data.error ||
            "Error getting dashboard user",
        };
      }
    } catch (error) {
      console.log("Error getting dashboard user:", error);
      throw error;
    }
  }

  const getMyPurchases = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/my-purchases`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          error:
            data.detail ||
            data.message ||
            data.error ||
            "Error getting my purchases",
        };
      }
    } catch (error) {
      console.log("Error getting my purchases:", error);
      throw error;
    }
  }

  const getMyPurchasedWorkflows = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/my-workflow`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          error:
            data.detail ||
            data.message ||
            data.error ||
            "Error getting my purchased workflows",
        };
      }
    } catch (error) {
      console.log("Error getting my purchased workflows:", error);
      throw error;
    }
  }

  const getMyWishlist = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authApi.getAuthToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          error:
            data.detail ||
            data.message ||
            data.error ||
            "Error getting my wishlist",
        };
      }
    } catch (error) {
      console.log("Error getting my wishlist:", error);
      throw error;
    }
  }
  return {
    getUserProfile,
    updateUserProfile,
    getDashboardUser,
    getMyPurchases,
    getMyPurchasedWorkflows,
    getMyWishlist,
  };
};
export default UserApi;
