import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.scss';
import Navbar from '../components/Navbar';
import defaultPP from '../images/pp.png';
import Modal from '../pages/Modal';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [friends, setFriends] = useState([]);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const token = localStorage.getItem('token');

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/users/profile', {
        headers: { 'x-auth-token': token },
      });
      setUser(res.data);
      setUsername(res.data.username);
      setBio(res.data.bio);
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/posts/user', {
        headers: { 'x-auth-token': token },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    }
  };

  const fetchFriends = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/friends/friends', {
        headers: { 'x-auth-token': token },
      });
      setFriends(res.data);
    } catch (err) {
      console.error('Error fetching friends:', err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
    fetchFriends();
  }, [fetchUserProfile, fetchUserPosts, fetchFriends]);

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);
    if (password) formData.append('password', password);
    if (profilePic) formData.append('profilePic', profilePic);

    try {
      await axios.put('http://localhost:5050/api/users/profile', formData, {
        headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' },
      });
      setEditMode(false);
      fetchUserProfile();
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile');
    }
  };

  const handleCancelChanges = () => {
    setEditMode(false);
    setUsername(user.username);
    setBio(user.bio);
    setPassword('');
    setProfilePic(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-header">
          <img src={user.profilePic ? `http://localhost:5050/uploads/${user.profilePic}` : defaultPP} alt="Profile Pic" className="profile-pic" />
          <h2>{user.username}</h2>
          <p>{user.bio}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
          <button onClick={() => setShowFriendsModal(true)}>Friends ({friends.length})</button>
        </div>

        {editMode && (
          <div className="edit-profile-form">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter new username"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter new bio"
            ></textarea>
            <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={handleCancelChanges}>Cancel Changes</button>
          </div>
        )}

        <div className="profile-posts">
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post._id} className="profile-post">
                <img src={`http://localhost:5050/uploads/${post.image}`} alt="Post" />
                <p>{post.content}</p>
              </div>
            ))
          ) : (
            <p className="no-posts-message">No posts to display</p>
          )}
        </div>

        {showFriendsModal && (
          <Modal onClose={() => setShowFriendsModal(false)}>
            <div className="modal-header">
              <h4>Friends</h4>
            </div>
            {friends.map(friend => (
              <div key={friend._id} className="friend-item">
                <img
                  src={friend.profilePic ? `http://localhost:5050/uploads/${friend.profilePic}` : defaultPP}
                  alt="Profile Pic"
                  className="friend-profile-pic"
                />
                <p>{friend.username}</p>
              </div>
            ))}
          </Modal>
        )}
      </div>
    </>
  );
};

export default Profile;