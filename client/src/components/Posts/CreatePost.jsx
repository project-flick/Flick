import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultPP from '../../images/pp.png';
import './CreatePost.scss';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5050/api/users/profile', {
          headers: { 'x-auth-token': token },
        });
        setProfilePic(res.data.profilePic);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5050/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      setContent('');
      setImage(null);
      setPreview(null);
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <div className="create-post-input">
          {profilePic ? (
            <img src={`http://localhost:5050/uploads/${profilePic}`} alt="Profile" className="profile-pic" />
          ) : (
            <img src={defaultPP} alt="Profile" className="profile-pic pp-default" />
          )}
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            required
          />
          <button type="submit" className="post-button">Post</button>
        </div>
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}
        <div className="create-post-actions">
          <label className="action-button">
            <input type="file" onChange={handleImageChange} />
            <i className="fas fa-image"></i> Photo
          </label>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;