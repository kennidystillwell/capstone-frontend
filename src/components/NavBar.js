import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import M from 'materialize-css';
import '../materialize/css/materialize.min.css';
import '../css/NavBar.css';

const Navbar = () => {
  // State to manage the mobile navigation menu
  const [isOpen, setIsOpen] = useState(false);

  // Reference to the navigation container for handling clicks outside
  const navRef = useRef(null);

  // Function to toggle the mobile navigation menu
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the mobile navigation menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Function to handle clicks outside the navigation container and close the menu
  const handleClickOutside = (event) => {
    // Close the menu if clicked outside the navigation container
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Effect hook to add and remove click event listener for handling clicks outside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Navigation bar with desktop and mobile versions */}
      <nav className="blue" role="navigation">
        <div className="nav-wrapper container" ref={navRef}>
          {/* Brand logo */}
          <a id="logo-container" href="/" className="brand-logo">
            BudgetBuddy
          </a>

          {/* Desktop navigation links */}
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/budget-tracker" onClick={handleLinkClick}>
                Budget Tracker
              </Link>
            </li>
            <li>
              <Link to="/resources" onClick={handleLinkClick}>
                Resources
              </Link>
            </li>
            {/* Added Login option */}
            <li>
              <Link to="/login" onClick={handleLinkClick}>
                Login
              </Link>
            </li>
          </ul>

          {/* Mobile navigation menu */}
          <ul
            id="nav-mobile"
            className={`sidenav ${isOpen ? "open" : ""}`}
            style={{
              transform: isOpen ? "translateX(0%)" : "translateX(-105%)",
            }}>
            <li>
              <Link to="/budget-tracker" onClick={handleLinkClick}>
                Budget Tracker
              </Link>
            </li>
            <li>
              <Link to="/resources" onClick={handleLinkClick}>
                Resources
              </Link>
            </li>
            {/* Added Login option */}
            <li>
              <Link to="/login" onClick={handleLinkClick}>
                Login
              </Link>
            </li>
          </ul>

          {/* Mobile menu trigger button */}
          <a
            href="#"
            data-target="nav-mobile"
            className="sidenav-trigger"
            onClick={toggleNav}>
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
