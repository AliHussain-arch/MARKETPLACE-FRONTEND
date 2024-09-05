const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/user/userId/item/itemId/comments`;

const create = async (itemId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

const update = async (commentId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${commentId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hootFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

const remove = async (commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${commentId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

export { create, update, remove };