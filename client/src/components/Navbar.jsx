import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import logo from '../images/logo.png';
import './Navbar.scss';

const Navbar = () => {
  const [hasToken, setHasToken] = useState(localStorage.getItem('token') !== null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setHasToken(localStorage.getItem('token') !== null);
  }, [localStorage.getItem('token')]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setHasToken(false);
    navigate('/login');
  };

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={logo} alt="Flick logo" />
      </div>
      <ul>
        {hasToken ? (
          <>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === '/profile' ? 'active' : ''}>
              <Link to="/profile">Profile</Link>
            </li>
            <li className={location.pathname === '/friends' ? 'active' : ''}>
              <Link to="/friends">Friends</Link>
            </li>
            <li className={location.pathname === '/notifications' ? 'active' : ''}>
              <Link to="/notifications">Notifications</Link>
            </li>
            <li>
              <Link className="logout-button" onClick={handleLogout}>Log out</Link>
            </li>
          </>
        ) : (
          <>
            <li className={location.pathname === '/login' ? 'active' : ''}>
              <Link to="/login">Login</Link>
            </li>
            <li className={location.pathname === '/register' ? 'active' : ''}>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;