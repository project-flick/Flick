import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ postId, likes }) => {
  const [likeCount, setLikeCount] = useState(likes.length);
  const [liked, setLiked] = useState(likes.includes(localStorage.getItem('userId')));

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:5050/api/likes`, { postId }, {
        headers: { 'x-auth-token': token },
      });
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      setLiked(!liked);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  return (
    <div>
      <button onClick={handleLike}>
        {liked ? 'Unlike' : 'Like'} ({likeCount})
      </button>
    </div>
  );
};

export default LikeButton;