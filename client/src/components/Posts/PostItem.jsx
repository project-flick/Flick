import React from 'react';

const PostItem = ({ post }) => {
  return (
    <div>
      <h3>{post.content}</h3>
      {post.image && <img src={post.image} alt="Post" />}
      <p>By: {post.userId}</p>
    </div>
  );
};

export default PostItem;