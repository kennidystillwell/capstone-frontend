import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "materialize-css/dist/css/materialize.min.css";
import '../css/NavBar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="green darken-1" role="navigation">
        <div className="nav-wrapper container" ref={navRef}>
          <a id="logo-container" href="/" className="brand-logo">
            BudgetBuddy
          </a>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/budget-tracker" onClick={handleLinkClick}>Budget Tracker</Link></li>
            <li><Link to="/resources" onClick={handleLinkClick}>Resources</Link></li>
            {user && <li><a href="/" onClick={handleLogout}>Logout</a></li>}
            {!user && <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>}
          </ul>
          <ul
            id="nav-mobile"
            className={`sidenav ${isOpen ? "open" : ""}`}
            style={{
              transform: isOpen ? "translateX(0%)" : "translateX(-105%)",
            }}
          >
            <li><Link to="/budget-tracker" onClick={handleLinkClick}>Budget Tracker</Link></li>
            <li><Link to="/resources" onClick={handleLinkClick}>Resources</Link></li>
            {user && <li><a href="/" onClick={handleLogout}>Logout</a></li>}
            {!user && <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>}
          </ul>
          <a
            href="#"
            data-target="nav-mobile"
            className="sidenav-trigger"
            onClick={toggleNav}
          >
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
