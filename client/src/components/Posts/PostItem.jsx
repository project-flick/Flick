import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments';
import Modal from './LikeModal/LikeModal';

const PostItem = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [likesList, setLikesList] = useState([]);
  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    if (post.likes.includes(currentUserId)) {
      setUserHasLiked(true);
    }
  }, [post.likes, currentUserId]);

  const handleToggleLike = async () => {
    try {
      if (userHasLiked) {
        await axios.post('http://localhost:5050/api/likes/unlike', { postId: post._id }, {
          headers: {
            'x-auth-token': token,
          },
        });
        setLikes(likes - 1);
      } else {
        await axios.post('http://localhost:5050/api/likes/like', { postId: post._id }, {
          headers: {
            'x-auth-token': token,
          },
        });
        setLikes(likes + 1);
      }
      setUserHasLiked(!userHasLiked);
    } catch (err) {
      console.error(err);
      alert('Failed to update like status');
    }
  };

  const fetchLikes = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/likes/post/${post._id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setLikesList(res.data);
    } catch (err) {
      console.error('Error fetching likes:', err);
    }
  };

  const toggleShowLikes = () => {
    if (!showLikes) {
      fetchLikes();
    }
    setShowLikes(!showLikes);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5050/api/posts/${post._id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      alert('Post deleted');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to delete post');
    }
  };

  return (
    <div>
      <h3>{post.content}</h3>
      {post.image && <img src={`http://localhost:5050/uploads/${post.image}`} alt="Post" />}
      <p>By: {post.userId.username}</p>
      <button onClick={handleToggleLike}>{userHasLiked ? 'Unlike' : 'Like'}</button>
      <button onClick={toggleShowLikes}>View Likes ({likes})</button>
      {showLikes && (
        <Modal onClose={toggleShowLikes}>
          <h4>Liked by:</h4>
          {likesList.map((like) => (
            <p key={like._id}>{like.userId.username}</p>
          ))}
        </Modal>
      )}
      {post.userId._id === currentUserId && (
        <>
          <Link to={`/edit/${post._id}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
      <Comments postId={post._id} />
    </div>
  );
};

export default PostItem;