const BACKEND_URL = 'http://localhost:3000'

const signout = () => {
  window.localStorage.removeItem("token");
};

const getUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
        return null
    };
    const rawPayload = token.split(".")[1];
    const jsonPayload = window.atob(rawPayload);
    const user = JSON.parse(jsonPayload);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Something went wrong");
    }
    return json;
  } catch (error) {
    console.log("Signup error:", error);
    throw error;
  }
};

const signin = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    if (json.token) {
      window.localStorage.setItem("token", json.token);
      const rawPayload = json.token.split(".")[1];
      const jsonPayload = window.atob(rawPayload);
      const user = JSON.parse(jsonPayload);
      return user;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  signup,
  signin,
  getUser,
  signout,
};