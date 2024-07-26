import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/auth/register', { username, email, password });
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error('Registration Error:', err);
      alert('Failed to register');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Sign up</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="auth-right">
        <div className="auth-right-content">
          <h1>Join us</h1>
          <p>Lorem Ipsum is simply</p>
          <p>If you already have an account</p>
          <Link to="/login" className="login-link">Sign in here !</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;