import { Link } from 'react-router-dom';
// import logo from '../images/logo.jpg';
import logo from '../images/logo.png';
import React, { useEffect, useState } from 'react';
import './Navbar.scss';

const Navbar = () => {
  const [hasToken, setHasToken] = useState(localStorage.getItem('token') !== null);

  useEffect(() => {
    setHasToken(localStorage.getItem('token') !== null)
  }, [localStorage.getItem('token')]);

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={logo} alt="Flick logo"/>
      </div>
      <ul>
        {hasToken ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/">Friends</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;