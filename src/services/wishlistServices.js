const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const addToWishlist = async (profileId, itemId) => {
  try {
    const response = await fetch(`${BASE_URL}/profile/${profileId}/wishlist`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: itemId }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
    throw error;
  }
};

const getWishlist = async (profileId) => {
  try {
    const response = await fetch(`${BASE_URL}/profile/${profileId}/wishlist`, {
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
    console.error("Failed to get wishlist:", error);
    throw error;
  }
};

const removeFromWishlist = async (profileId, wishlistId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/profile/${profileId}/wishlist/${wishlistId}`,
      {
        method: "DELETE",
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
    console.error("Failed to remove from wishlist:", error);
    throw error;
  }
};

export default {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};
