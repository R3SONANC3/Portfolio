import React from "react";
import logo from "../assets/Logo.png";
import { FaHome, FaUser, FaGraduationCap, FaFolderOpen } from "react-icons/fa";
import { FaGithub , FaFacebookF, FaInstagram } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="nav-wrapper">
      <div className="nav-content">
        <div className="logo-container">
          <img className="logo" src={logo} alt="logo" />
          <span className="logo-text">Resonance</span>
        </div>
        <ul>
          <li>
            <a className="nav-item" href="/">
              <FaHome className="nav-icon" />
              Home
            </a>
          </li>
          <li>
            <a className="nav-item" href="/about">
              <FaUser className="nav-icon" /> About
            </a>
          </li>
          <li>
            <a className="nav-item" href="/skills">
              <FaGraduationCap className="nav-icon" />
              Skills
            </a>
          </li>
          <li>
            <a className="nav-item" href="/project">
              <FaFolderOpen className="nav-icon" /> Projects
            </a>
          </li>
          <div className="social-icons">
            <a
              href="https://github.com/R3SONANC3"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.facebook.com/jeerapat.kahyaisiang"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/_grxp4t"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>

          <button className="connect-btn">Let's Connect</button>
        </ul>
        <button className="nav-menu" onClick={() => {}}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "1.8rem" }}
          >
            menu
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
