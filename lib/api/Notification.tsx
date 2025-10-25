import AuthApi from "./Auth";

const NotificationApi = () => {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const authApi = AuthApi();

  const getMyNotifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications`, {
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
            "Error getting notifications",
        };
      }
    } catch (error) {
      console.log("Error getting notifications:", error);
      throw error;
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}/read`, {
        method: "PATCH",
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
            "Error marking notification as read",
        };
      }
    } catch (error) {
      console.log("Error marking notification as read:", error);
      throw error;
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}`, {
        method: "DELETE",
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
            "Error deleting notification",
        };
      }
    } catch (error) {
      console.log("Error deleting notification:", error);
      throw error;
    }
  };

  const deleteAllNotifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications/all`, {
        method: "DELETE",
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
            "Error deleting all notifications",
        };
      }
    } catch (error) {
      console.log("Error deleting all notifications:", error);
      throw error;
    }
  };

  return {
    getMyNotifications,
    markNotificationAsRead,
    deleteNotification,
    deleteAllNotifications,
  };
};

export default NotificationApi;
