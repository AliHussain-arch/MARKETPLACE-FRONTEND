const BACKEND_URL = "http://localhost:3000";

const createItem = async (userId, formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/user/${userId}/item`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Something went wrong");
    }
    return json;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

const listItems = async (userId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/user/${userId}/item`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Something went wrong");
    }
    return json;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

const getItem = async (userId, itemId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/user/${userId}/item/${itemId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Something went wrong");
    }
    return json;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

const updateItem = async (userId, itemId, formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/user/${userId}/item/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Something went wrong");
    }
    return json;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

const deleteItem = async (userId, itemId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/user/${userId}/item/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Something went wrong");
    }
    return json;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export default {
  createItem,
  listItems,
  getItem,
  updateItem,
  deleteItem,
};
