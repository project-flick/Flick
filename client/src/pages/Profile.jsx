import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.scss';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);
    if (password) formData.append('password', password);
    if (profilePic) formData.append('profilePic', profilePic);

    try {
      await axios.put('http://localhost:5050/api/users/profile', formData, {
        headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile updated successfully');
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
    <div className="profile-page">
      {user ? (
        <div className="profile-details">
          <img
            src={profilePic ? URL.createObjectURL(profilePic) : `http://localhost:5050/uploads/${user.profilePic}`}
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-info">
            {editMode ? (
              <>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
                <div className="profile-buttons">
                  <button onClick={handleSaveChanges}>Save Changes</button>
                  <button onClick={handleCancelChanges}>Cancel Changes</button>
                </div>
              </>
            ) : (
              <>
                <h2>{user.username}</h2>
                <p>{user.bio}</p>
                <button onClick={() => setEditMode(true)}>Edit Profile</button>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="user-posts">
        {posts.length ? (
          posts.map((post) => (
            <div key={post._id} className="post-item">
              <img src={`http://localhost:5050/uploads/${post.image}`} alt="Post" />
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p className="no-posts">No posts</p>
        )}
      </div>
    </div>
  );
};

export default Profile;