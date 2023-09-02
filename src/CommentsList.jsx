import React from 'react';

function CommentList({ comments, onPostClick }) {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id} onClick={() => onPostClick(comment.postId)}>
          {comment.name}
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
