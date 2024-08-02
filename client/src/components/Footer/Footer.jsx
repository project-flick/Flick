import React from 'react';
import './Footer.scss';
import syntaxLogo from '../../images/syntaxlogo.jpeg'; 

const Footer = () => {
  return (
    <footer className="footer">
      <img src={syntaxLogo} alt="Syntax Logo" className="footer-logo" />
      <p>&copy; Flick 2024</p>
    </footer>
  );
};

export default Footer;