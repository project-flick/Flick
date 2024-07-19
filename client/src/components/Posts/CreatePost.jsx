import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:5050/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      alert('Post created');
      setContent('');
      setImage(null);
      console.log(response.data);
    } catch (err) {
      console.error('Error details:', err.response || err.message || err);
      alert('Post creation failed');
    }
  };

  return (
    <div>
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