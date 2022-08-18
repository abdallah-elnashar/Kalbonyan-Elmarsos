import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getAllComments } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";
const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { quoteId } = params;

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <div className="centered">No comments were added yet.</div>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
