import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const SignUpForm = () => {
  return (
    <div>
      <div className="container">
        <h4>Create an Account</h4>
        <form>
          <div className="input-field">
            <input id="first_name" type="text" className="validate" />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="input-field">
            <input id="last_name" type="text" className="validate" />
            <label htmlFor="last_name">Last Name</label>
          </div>
          <div className="input-field">
            <input id="email" type="email" className="validate" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input id="phone" type="tel" className="validate" />
            <label htmlFor="phone">Phone Number</label>
          </div>
          <div className="input-field">
            <input id="password" type="password" className="validate" />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field">
            <input id="security_question" type="text" className="validate" />
            <label htmlFor="security_question">Security Question: What is your mother's maiden name?</label>
          </div>
          <button className="btn waves-effect waves-light" type="submit">Sign Up</button>
        </form>
        <div style={{ marginTop: '20px' }}>
          <Link to="/login" className="waves-effect waves-light btn">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
