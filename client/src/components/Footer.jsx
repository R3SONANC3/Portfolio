import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Me</h3>
          <p>A software developer with a passion for creating beautiful and efficient solutions.</p>
        </div>
        <div className="footer-section">
          <h3>Navigate</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Project</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: <a href="mailto:jeerapat5870@gmail.com">jeerapat5870@gmail.com</a></p>
          <p>GitHub: <a href="https://github.com/R3SONANC3" target="_blank" rel="noopener noreferrer">@R3SONANC3</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">Your Name</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Resonance. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
