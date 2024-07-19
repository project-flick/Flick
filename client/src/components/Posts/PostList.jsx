import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from './PostItem';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5050/api/posts', {
          headers: { 'x-auth-token': token },
        });
        setPosts(res.data);
      } catch (err) {
        console.log("Auth token invalid or not found");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className="page-title">Posts</h2>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;