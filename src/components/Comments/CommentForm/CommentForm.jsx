import { useState, useEffect } from 'react';

const CommentForm = ({ handleAddComment, handleEditComment, comment }) => {
    const [formData, setFormData] = useState({content: ''});

    const handleChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!comment) {
            handleAddComment(formData);
        } else {
            handleEditComment(formData, comment);
        };
        setFormData({content: ''});
    };

    useEffect(() => {
        if (comment) setFormData({content: comment.content});
    }, [comment]);

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text-input">Your comment:</label>
                <textarea required type="text" name="content" id="content" value={formData.content} onChange={handleChange} />
                <button type="submit">{comment ? 'Edit Comment' : 'Submit Comment'}</button>
            </form>
        </>
    );
};

export default CommentForm;