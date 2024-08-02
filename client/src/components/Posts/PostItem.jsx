import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultPP from '../../images/pp.png';
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
        {post.userId && post.userId.profilePic ? (
          <img src={`http://localhost:5050/uploads/${post.userId.profilePic}`} alt="Profile Pic" className="post-profile-pic" />
        ) : (
          <img src={defaultPP} alt="Profile Pic" className="post-profile-pic pp-default" />
        )}
        <div className="post-header-details">
          <p className="post-username">{post.userId ? post.userId.username : 'Unknown User'}</p>
          {post.userId && post.userId._id === currentUserId && (
            <div className="post-actions">
              <Link to={`/edit/${post._id}`} className="post-edit">
                <i className="fas fa-edit"></i>
              </Link>
              <button onClick={handleDelete} className="post-delete">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      {post.image && <img src={`http://localhost:5050/uploads/${post.image}`} alt="Post" className="post-image" />}
      <div className="post-content">
        <p>{post.content}</p>
        <div className="post-actions">
          <button onClick={handleToggleLike} className="post-like">
            <i className={`fas fa-heart${userHasLiked ? ' liked' : ''}`}></i>
            {userHasLiked ? 'Unlike' : 'Like'}
          </button>
          <button onClick={toggleShowLikes} className="post-view-likes">
            View Likes ({likes})
          </button>
        </div>
        <Comments postId={post._id} />
      </div>
      {showLikes && (
        <Modal onClose={toggleShowLikes}>
          <div className="modal-header">
            <h4>Liked by:</h4>
          </div>
          {likesList.map((like) => (
            <div key={like._id} className="liked-user">
              <img
                src={like.profilePic ? `http://localhost:5050/uploads/${like.profilePic}` : defaultPP}
                alt="Profile Pic"
              />
              <p>{like.username}</p>
            </div>
          ))}
      </Modal>
      )}
    </div>
  );
};

export default PostItem;