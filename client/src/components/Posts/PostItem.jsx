import React from 'react';

const PostItem = ({ post }) => {
  return (
    <div>
      <h3>{post.content}</h3>
      {post.image && <img src={`http://localhost:5050/uploads/${post.image}`} alt="Post" />}
      <p>By: {post.userId.username}</p>
    </div>
  );
};

export default PostItem;