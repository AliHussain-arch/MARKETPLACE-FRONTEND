import { useState, useEffect } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import ConfirmDelete from '../../Common/ConfirmDelete';
import * as commentService from '../../../services/commentService';
import './CommentList.css';

const CommentList = ({item, setItem, itemId, userId, user, trigger, setTrigger}) => {
    const [showEditForm, setShowEditForm] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);

    const handleAddComment = async (commentFormData) => {
        try {
            const newComment = await commentService.create(commentFormData, userId, itemId);
            setItem({...item, comments: [...item.comments, newComment]});
            setTrigger(!trigger);
        } catch (error) {
            console.error(error);
        };
    };

    const handleEditComment = async (commentFormData, originalComment) => {
        try {
            const editedComment = await commentService.update(commentFormData, userId, itemId, originalComment._id);
            editedComment.poster = originalComment.poster;
            const updatedComments = item.comments.map((comment) => {
               return comment._id === originalComment._id ? editedComment : comment
            });
            setItem({...item, comments: updatedComments});
            setShowEditForm(null);
            setTrigger(!trigger);
        } catch (error) {
            console.error(error);
        };
    };
    
    const handleDeleteComment = async (commentId) => {
        try {
            const deletedComment = await commentService.remove(userId, itemId, commentId);
            const updatedComments = item.comments.filter((comment) => {comment._id !== commentId});
            setItem({...item, comments: updatedComments});
            setShowConfirmDelete(null);
            setTrigger(!trigger);
        } catch (error) {
            console.error(error);
        };
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
                        {showEditForm === comment._id ? <CommentForm handleEditComment={handleEditComment} comment={comment} setShowEditForm={setShowEditForm} /> : <></>}
                        {showConfirmDelete === comment._id ? <ConfirmDelete handleDeleteComment={handleDeleteComment} commentId={comment._id} setShowConfirmDelete={setShowConfirmDelete}/> : <></>}
                    </article>
                ))}
            </section>
        </>
    );
};

export default CommentList;