import React from 'react';
import CreatePost from '../components/Posts/CreatePost';
import PostList from '../components/Posts/PostList';
import Navbar from '../components/Navbar';


const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Home;