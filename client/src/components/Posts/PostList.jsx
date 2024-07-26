import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import './PostList.scss';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5050/api/posts', {
        headers: { 'x-auth-token': token },
      });
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      <h2 className="page-title">Posts</h2>
      <div className="posts-list">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;