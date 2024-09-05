import { useState } from 'react';

const CommentForm = ({ handleAddComment }) => {
    const [formData, setFormData] = useState({content: ''});

    const handleChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddComment(formData);
        setFormData({content: ''});
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text-input">Your comment:</label>
                <textarea required type="text" name="content" id="content" value={formData.content} onChange={handleChange} />
                <button type="submit">Submit Comment</button>
            </form>
        </>
    );
};

export default CommentForm;