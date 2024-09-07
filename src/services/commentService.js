const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const create = async (commentFormData, userId, itemId) => {
    try {
        const res = await fetch(`${BASE_URL}/user/${userId}/item/${itemId}/comments`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

const update = async (commentFormData, userId, itemId, commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/user/${userId}/item/${itemId}/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

const remove = async (userId, itemId, commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/user/${userId}/item/${itemId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

export { create, update, remove };