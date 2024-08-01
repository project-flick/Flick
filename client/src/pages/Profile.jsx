import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.scss';
import Navbar from '../components/Navbar';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5050/api/users/profile', {
        headers: {
          'x-auth-token': token,
        },
      });
      setUser(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setBio(res.data.bio);
      setProfilePic(res.data.profilePic);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      alert('Failed to fetch user profile');
    }
  };

  const fetchUserPosts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5050/api/posts/user', {
        headers: {
          'x-auth-token': token,
        },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching user posts:', err);
      alert('Failed to fetch user posts');
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
  }, []);

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:5050/api/users/profile', {
        username,
        email,
        bio,
      }, {
        headers: {
          'x-auth-token': token,
        },
      });
      alert('Profile updated successfully');
      setEditMode(false);
      fetchUserProfile();
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile');
    }
  };

  const handleProfilePicChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  const handleProfilePicUpload = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('profilePic', newProfilePic);

    try {
      await axios.put('http://localhost:5050/api/users/profile/picture', formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile picture updated successfully');
      fetchUserProfile();
    } catch (err) {
      console.error('Error updating profile picture:', err);
      alert('Failed to update profile picture');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="profile-page">
      {user ? (
        <>
          <div className="profile-header">
            <img src={`http://localhost:5050/uploads/${profilePic}`} alt="Profile" className="profile-pic" />
            <div className="profile-info">
              <h2>{username}</h2>
              <p>{bio}</p>
            </div>
          </div>
          <button onClick={() => setEditMode(!editMode)}>Edit Profile</button>
          {editMode && (
            <div className="edit-profile">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
              />
              <input
                type="file"
                onChange={handleProfilePicChange}
              />
              <button onClick={handleProfileUpdate}>Save Changes</button>
              {newProfilePic && <button onClick={handleProfilePicUpload}>Upload Profile Picture</button>}
            </div>
          )}
          <div className="profile-posts">
            {posts.map(post => (
              <div key={post._id} className="post-item">
                {post.image && <img src={`http://localhost:5050/uploads/${post.image}`} alt="Post" />}
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
};

export default Profile;