import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      navigate('/');
    } catch (err) {
      console.error('Login Error:', err);
      alert('Failed to login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-left-content">
          <h1>Sign in to</h1>
          <p>Lorem Ipsum is simply</p>
          <p>If you don't have an account register</p>
          <Link to="/register" className="register-link">Register here !</Link>
        </div>
      </div>
      <div className="auth-right">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Sign in</h2>
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
          <button type="submit">Login</button>
          <p>
            Forgot password?
          </p>
          <div className="social-login">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-apple"></i>
            <i className="fab fa-google"></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;