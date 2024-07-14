import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5050/api/posts/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setContent(res.data.content);
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:5050/api/posts/${id}`,
        { content },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Post update failed');
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Edit your post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditPost;