import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../images/logo.png';
import './Auth.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5050/api/auth/register', { username, email, password });
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error('Registration Error:', err);
      alert('Failed to register');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-right">
        <div className="auth-right-content">
          <h1>Join Us!</h1>
          <p>Create an account to get started.</p>
          <p>Already have an account?</p>
          <Link to="/login" className="auth-link">Sign in here!</Link>
        </div>
      </div>
      <div className="auth-left">
        <div className="app-intro">
          <img src={logo} className="logo" alt='logo' />
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Sign Up</h2>
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
    </div>
  );
};

export default Register;