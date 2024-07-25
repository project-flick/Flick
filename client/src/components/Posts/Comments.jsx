import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      await axios.post('http://localhost:5050/api/comments', { postId, text: commentText }, {
        headers: { 'x-auth-token': token },
      });
      setCommentText('');
      fetchComments(); // Refresh comments after adding a new one
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Post</button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;