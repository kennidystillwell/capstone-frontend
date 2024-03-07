import React from "react";
import { Link } from "react-router-dom";
import '../css/Footer.css';

const Footer = () => {
  const logoFacebook = `${process.env.PUBLIC_URL}/images/facebook.png`;
  const logoInstagram = `${process.env.PUBLIC_URL}/images/instagram.png`;
  const logoTwitter = `${process.env.PUBLIC_URL}/images/twitter.png`;

  return (
    <footer className="page-footer green lighten-1">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Budget Buddy</h5>
            <p className="grey-text text-lighten-4">
              Take control of your finances with ease. Discover how Budget Buddy can empower you to meet your financial goals.
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Explore</h5>
            <ul>
              <li><Link className="grey-text text-lighten-3" to="/">Home</Link></li>
              <li><Link className="grey-text text-lighten-3" to="/budget-tracker">Budget Tracker</Link></li>
              <li><Link className="grey-text text-lighten-3" to="/resources">Resources</Link></li>
            </ul>
          </div>
          <div className="col l12 s12">
            <h5 className="white-text">Connect With Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={logoFacebook} alt="Facebook" className="social-icon"/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={logoInstagram} alt="Instagram" className="social-icon"/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={logoTwitter} alt="Twitter" className="social-icon"/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © {new Date().getFullYear()} Budget Buddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
