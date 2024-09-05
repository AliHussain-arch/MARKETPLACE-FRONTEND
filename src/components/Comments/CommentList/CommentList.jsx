import CommentForm from '../CommentForm/CommentForm'

const CommentList = () => {
    const handleAddComment = async (commentFormData) => {
        
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
                    </article>
                ))}
            </section>
        </>
    );
};

export default CommentList;