import { useParams } from 'react-router-dom';

import CommentForm from '../CommentForm/CommentForm'
import * as commentService from '../../../services/commentService'

const CommentList = ({item, setItem, itemId, userId}) => {
    const { commentId } = useParams();
    
    const handleAddComment = async (commentFormData) => {
        console.log('adding comment...')
        const newComment = await commentService.create(commentFormData, userId, itemId);
        console.log('new comment')
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
                        {/* {Logic for if the user logged is the poster, then show edit and delete buttons} */}
                        {/* Edit uses commentform component */}
                    </article>
                ))}
            </section>
        </>
    );
};

export default CommentList;