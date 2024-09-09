const ConfirmDelete = ({handleDeleteComment, commentId, setShowConfirmDelete}) => {
    return(
        <div>
            <p>Are you sure you want to delete this comment?</p>
            <button className="delete-button" onClick={() => handleDeleteComment(commentId)}>Confirm Delete</button>
            <button onClick={() => setShowConfirmDelete(null)}>Don't Delete!</button>
        </div>
    );
};

export default ConfirmDelete;