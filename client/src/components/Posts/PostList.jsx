import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PostItem from './PostItem';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`, {
        headers: { 'x-auth-token': token },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;