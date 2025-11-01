const CategoryApi = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Get All Categories (no auth, no headers)
  const getAllCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories/`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, data: data };
      } else {
        return { success: false, error: data.detail || data.message || data.error || "Error fetching categories" };
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
      throw error;
    }
  };

  return {
    getAllCategories,
  };
};

export default CategoryApi;