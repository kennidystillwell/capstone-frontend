import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HomeNav.css';

const HomeNav = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <div className="card-panel green lighten-1 smaller-card">
            <Link to="/budget-tracker">
              <h5 className="white-text font-weight-bold">Budget Tracker</h5>
            </Link>
            <p>Track and manage your finances with ease.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <div className="card-panel green lighten-1 smaller-card">
            <Link to="/resources">
              <h5 className="white-text font-weight-bold">Resources</h5>
            </Link>
            <p>Access valuable financial resources and tips.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <div className="card-panel green lighten-1 smaller-card">
            <Link to="/login">
              <h5 className="white-text font-weight-bold">Login</h5>
            </Link>
            <p>Sign in to access your Budget Buddy account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeNav;
