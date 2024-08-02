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
  const [followers, setFollowers] = useState([]);
  const [showFollowersModal, setShowFollowersModal] = useState(false);

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

  const fetchFollowers = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/friends/followers', {
        headers: { 'x-auth-token': token },
      });
      setFollowers(res.data);
    } catch (err) {
      console.error('Error fetching followers:', err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
    fetchFollowers();
  }, []);

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

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-header">
          {user && user.profilePic ? (
            <img src={`http://localhost:5050/uploads/${user.profilePic}`} alt="Profile Pic" className="profile-pic" />
          ) : (
            <img src={defaultPP} alt="Profile Pic" className="profile-pic pp-default" />
          )}
          <div className="profile-info">
            <h2>{user?.username}</h2>
            <p>{user?.bio}</p>
            <div className="profile-actions">
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
              <button onClick={() => setShowFollowersModal(true)}>Followers ({followers.length})</button>
            </div>
          </div>
        </div>

        {editMode && (
          <div className="edit-profile-form">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter new username"
            />
            <input
              type="email"
              value={user?.email}
              disabled
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
            posts.map((post) => (
              <div key={post._id} className="profile-post">
                <img src={`http://localhost:5050/uploads/${post.image}`} alt="Post" />
                <p>{post.content}</p>
              </div>
            ))
          ) : (
            <p className="no-posts-message">No posts to display</p>
          )}
        </div>

        {showFollowersModal && (
          <Modal onClose={() => setShowFollowersModal(false)}>
            <h2>Followers</h2>
            <div className="followers-list">
              {followers.map((follower) => (
                <div key={follower._id} className="follower-item">
                  <img
                    src={follower.profilePic ? `http://localhost:5050/uploads/${follower.profilePic}` : defaultPP}
                    alt="Profile Pic"
                    className="follower-profile-pic"
                  />
                  <div className="follower-info">
                    <p>{follower.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Profile;