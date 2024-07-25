import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments/Comments';
import Modal from './Likes/LikeModal';
import './PostItem.scss';

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
    <div className="post">
      <div className="post-header">
        <img src={`http://localhost:5050/uploads/${post.userId.profilePic}`} alt="Profile Pic" className="post-profile-pic" />
        <p className="post-username">{post.userId.username}</p>
      </div>
      {post.image && <img src={`http://localhost:5050/uploads/${post.image}`} alt="Post" className="post-image" />}
      <div className="post-content">
        <p>{post.content}</p>
        <div className="post-actions">
          <button onClick={handleToggleLike} className="post-like">
            {userHasLiked ? 'Unlike' : 'Like'}
          </button>
          <button onClick={toggleShowLikes} className="post-view-likes">
            View Likes ({likes})
          </button>
          {post.userId._id === currentUserId && (
            <>
              <Link to={`/edit/${post._id}`} className="post-edit">Edit</Link>
              <button onClick={handleDelete} className="post-delete">Delete</button>
            </>
          )}
        </div>
        <Comments postId={post._id} />
      </div>
      {showLikes && (
        <Modal onClose={toggleShowLikes}>
          <div className="modal-content">
            <div className="modal-header">
              <h4>Liked by:</h4>
              <button onClick={toggleShowLikes} className="modal-close">&times;</button>
            </div>
            {likesList.map((like) => (
              <p key={like._id}>{like.userId.username}</p>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PostItem;