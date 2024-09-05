import { useState } from 'react';
import { useParams } from 'react-router-dom';

import CommentForm from '../CommentForm/CommentForm'
import * as commentService from '../../../services/commentService'

const CommentList = () => {
    const { itemId, commentId } = useParams();
    const [item, setItem] = useState(null);
    
    const handleAddComment = async (commentFormData) => {
        const newComment = await commentService.create(itemId, commentFormData);
        setItem({...item, comments: [...item.comments, newComment]});
    };

    const handleEditComment = async (commentId, commentFormData) => {
        const editedComment = await commentService.update(itemId, commentId, commentFormData);
        setItem({...item, })
    }
    
    const handleDeleteComment = async (commentId, commentFormData) => {

    }

    return(
        <>
            <section class="comments-container">
                <h3>Comments</h3>
                <CommentForm handleAddComment={handleAddComment} />
                {!item.comments.length && <p>There are no comments.</p>}
                {item.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <PosterDate name={comment.poster.username} date={comment.createdAt} />
                        </header>
                        <p>{comment.content}</p>
                        {/* {Logic for if the user logged is the poster, then show edit and delete buttons} */}
                        {/* Edit uses commentform component */}
                    </article>
                ))}
            </section>
        </>
    );
};

export default CommentList;