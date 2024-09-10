const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const getProfile = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to get profile:", error);
    throw error;
  }
};

const updateProfile = async (formData, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};

export default {
  getProfile,
  updateProfile,
};
