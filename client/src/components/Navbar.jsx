import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';

const Navbar = () => {
  const token = localStorage.getItem('token');

  return (
    <nav>
      <h1>
        <img className="logo" src={logo} alt="Flick logo"/>
      </h1>
      <ul>
        {token ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
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

      <p className="copyright">&copy; Flick 2024</p>
    </nav>
  );
};

export default Navbar;