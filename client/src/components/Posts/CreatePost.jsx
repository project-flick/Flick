import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.scss';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5050/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      alert('Post created');
      setContent('');
      setImage(null);
      window.location.reload(); // Reload to show the new post without manual refresh
    } catch (err) {
      console.error(err);
      alert('Post creation failed');
    }
  };

  return (
    <div className="create-post">
      <h2 className="page-title">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;