import { useState } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import ConfirmDelete from '../../Common/ConfirmDelete';
import * as commentService from '../../../services/commentService';

const CommentList = ({item, setItem, itemId, userId, user}) => {
    const [showEditForm, setShowEditForm] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);

    const handleAddComment = async (commentFormData) => {
        const newComment = await commentService.create(commentFormData, userId, itemId);
        setItem({...item, comments: [...item.comments, newComment]});
    };

    const handleEditComment = async (commentFormData, originalComment) => {
        const editedComment = await commentService.update(commentFormData, userId, itemId, originalComment._id);
        editedComment.poster = originalComment.poster;
        const updatedComments = item.comments.map((comment) => {
            comment._id === originalComment._id ? editedComment : comment
        });
        setItem({...item, comments: updatedComments});
        setShowEditForm(null);
    };
    
    const handleDeleteComment = async (commentId, commentFormData) => {
        
    };

    return(
        <>
            <section className="comments-container">
                <h3>Comments</h3>
                <CommentForm handleAddComment={handleAddComment} />
                {!item.comments.length && <p>There are no comments.</p>}
                {item.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                        <p>
                            {comment.poster.username} posted on&nbsp;
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                        </header>
                        <p>{comment.content}</p>
                        {comment.poster._id === user.id && (<button onClick={() => {setShowEditForm(comment._id)}}>Edit</button>)}
                        {comment.poster._id === user.id && (<button onClick={() => {setShowConfirmDelete(comment._id)}}>Delete</button>)}
                        {showEditForm === comment._id ? <CommentForm handleEditComment={handleEditComment} comment={comment} /> : <></>}
                        {showConfirmDelete === comment._id ? <ConfirmDelete handleDeleteComment={handleDeleteComment} /> : <></>}
                    </article>
                ))}
            </section>
        </>
    );
};

export default CommentList;