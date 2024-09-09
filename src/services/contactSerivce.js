const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const createContact = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
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

export default {
  createContact,
};
