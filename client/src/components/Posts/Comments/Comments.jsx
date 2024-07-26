import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comments.scss';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5050/api/comments/post/${postId}`, {
        headers: { 'x-auth-token': token },
      });
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const res = await axios.post('http://localhost:5050/api/comments', {
        userId,
        postId,
        text: commentText,
      }, {
        headers: { 'x-auth-token': token },
      });
      setComments([...comments, res.data]);
      setCommentText('');
      fetchComments(); // Trigger re-fetching comments
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <div className="comments">
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment._id} className="comment">
            <p><strong>{comment.userId.username}</strong>: {comment.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          required
          className="comment-input"
        />
        <button type="submit" className="comment-post-button">Post</button>
      </form>
    </div>
  );
};

export default Comments;