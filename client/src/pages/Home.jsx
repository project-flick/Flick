import React from 'react';
import CreatePost from '../components/Posts/CreatePost';
import PostList from '../components/Posts/PostList';

const Home = () => {
  return (
    <div className="home">
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Home;