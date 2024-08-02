import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../images/logo.png';
import './Auth.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
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
          <h1>Welcome Back!</h1>
          <p>Sign in to access your account.</p>
          <p>Don't have an account?</p>
          <Link to="/register" className="auth-link">Sign up here!</Link>
        </div>
      </div>
      <div className="auth-right">
        <div className="app-intro">
          <img src={logo} className="logo"/>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Sign In</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email or username"
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