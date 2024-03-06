import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/loginForm.css';
import { useAuth } from './AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/login', {
        params: { email, password },
      });
      if (response.status === 200) {
        //update user state using login function
        login({
          ...response.data
        });
        setError('');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  //render different content for admin and non-admin users
  if (user) {
    if (user.redirect === '/admin') {
      //content for admin users
      return (
        <div className="welcome-message">
          <h4>{user.message}!</h4>
          <button className="btn waves-effect waves-light" onClick={() => navigate('/admin')}>
            Manage Users
          </button>
        </div>
      );
    } else {
      //content for regular users
      return (
        <div className="welcome-message">
          <h4>{user.message}!</h4>
          <p>Update your personal budget!</p>
          <Link to="/budget-tracker" className="btn waves-effect waves-light">Budget Tracker</Link>
        </div>
      );
    }
  }

  //render the login form if not logged in
  return (
    <div className="login-container">
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            id="email"
            type="email"
            className="validate"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="input-field password-input">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="validate"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            type="button"
            className="btn-toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn waves-effect waves-light" type="submit">
          Login
        </button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <Link to="/signup" className="waves-effect waves-light btn">
          Create an Account
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
