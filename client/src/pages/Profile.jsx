import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.scss';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5050/api/users/profile', {
        headers: { 'x-auth-token': token },
      });
      setUser(res.data);
      setUsername(res.data.username);
      setBio(res.data.bio);
      setEmail(res.data.email);
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const fetchUserPosts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5050/api/posts/user', {
        headers: { 'x-auth-token': token },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
  }, []);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const saveProfile = async () => {
    if (password && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);
    formData.append('email', email);
    if (password) formData.append('password', password);
    if (profilePic) formData.append('profilePic', profilePic);

    try {
      await axios.put('http://localhost:5050/api/users/profile', formData, {
        headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' },
      });
      setEditProfile(false);
      fetchUserProfile();
      window.location.reload();
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const cancelEdit = () => {
    setEditProfile(false);
    setUsername(user.username);
    setBio(user.bio);
    setEmail(user.email);
    setPassword('');
    setConfirmPassword('');
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
          <img src={`http://localhost:5050/uploads/${user.profilePic}`} alt="Profile Pic" className="profile-pic" />
          <h2>{user.username}</h2>
          <p>{user.bio}</p>
          <button onClick={() => setEditProfile(true)}>Edit Profile</button>
        </div>

        {editProfile && (
          <div className="edit-profile-form">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter new username"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter new bio"
            ></textarea>
            <input type="file" onChange={handleFileChange} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
            <button onClick={saveProfile}>Save Changes</button>
            <button onClick={cancelEdit}>Cancel Changes</button>
          </div>
        )}

        <div className="profile-posts">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="profile-post">
                {post.image && <img src={`http://localhost:5050/uploads/${post.image}`} alt="Post" />}
                <p>{post.content}</p>
              </div>
            ))
          ) : (
            <p className="no-posts-message">No posts to display</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;