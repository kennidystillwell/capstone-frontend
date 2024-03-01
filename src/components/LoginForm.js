import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const LoginForm = () => {
  return (
    <div>
      <div className="container">
        <h4>Login</h4>
        <form>
          <div className="input-field">
            <input id="email" type="email" className="validate" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input id="password" type="password" className="validate" />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn waves-effect waves-light" type="submit">Login</button>
        </form>
        <div style={{ marginTop: '20px' }}>
          <Link to="/signup" className="waves-effect waves-light btn">Create an Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
