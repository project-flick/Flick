import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';
import Navbar from '../components/Navbar';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5050/api/users/profile', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUser(res.data);
        setBio(res.data.bio);
        setUsername(res.data.username);
        setEmail(res.data.email);
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

    fetchUserProfile();
    fetchUserPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const saveProfile = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('profilePic', profilePic);
    formData.append('bio', bio);
    formData.append('username', username);
    formData.append('email', email);

    try {
      const response = await axios.put('http://localhost:5050/api/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      alert('Profile updated successfully');
      setEditProfile(false);
      window.location.reload();
    } catch (err) {
      console.error('Save Profile Error:', err);
      alert('Failed to update profile');
    }
  };

  const cancelEdit = () => {
    if (user) {
      setBio(user.bio);
      setUsername(user.username);
      setEmail(user.email);
      setProfilePic(null);
      setEditProfile(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>
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
          <button onClick={saveProfile}>Save Changes</button>
          <button onClick={cancelEdit}>Cancel Changes</button>
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
    </div>
    </>
  );
};

export default Profile;