const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const getHistory = async (userId, profileId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/user/${userId}/profile/${profileId}/history`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to get history:", error);
    throw error;
  }
};

export default {
  getHistory,
};
