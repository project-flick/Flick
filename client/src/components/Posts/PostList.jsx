import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from './PostItem';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
      const token = localStorage.getItem('token');
      const res = axios.get('http://localhost:5050/api/posts', {
        headers: { 'x-auth-token': token },
      }).then(data => data.json()).then((json) => {
        setPosts(json.data);
      }).catch((err) => {
        console.log("Auth token invalid or not found");
      });
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;