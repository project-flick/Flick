import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostItem = ({ post }) => {
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5050/api/posts/${post._id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      alert('Post deleted');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to delete post');
    }
  };

  return (
    <div>
      <h3>{post.content}</h3>
      {post.image && <img src={`http://localhost:5050/uploads/${post.image}`} alt="Post" />}
      <p>By: {post.userId.username}</p>
      <Link to={`/edit/${post._id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PostItem;