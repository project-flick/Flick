import React from 'react';
import CreatePost from '../components/Posts/CreatePost';
import PostList from '../components/Posts/PostList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';


const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <CreatePost />
      <PostList />
      <Footer />
    </div>
  );
};

export default Home;