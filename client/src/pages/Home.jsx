import React from 'react';
import PostList from '../components/Posts/PostList';
import CreatePost from '../components/Posts/CreatePost';

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Home;