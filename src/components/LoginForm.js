import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/loginForm.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const { login, user } = useAuth(); //access the login function/user state from the AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/login', {
        params: { email, password },
      });
      if (response.data.redirect === '/admin') {
        navigate(response.data.redirect, { state: { welcome: response.data.message } })
      } else if (response.status === 200) {
        //login successful
        console.log('User before login:', user); //log user state before login (troubleshooting)
        login(response.data); //update user state using login function
        console.log('User after login:', user); //log user state after login (troubleshooting)
        setError('');
        setIsLoggedIn(true); //update login status
      } else {
        //login failed
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  return (
    <div>
      {!isLoggedIn ? ( //render login form if not logged in
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
      ) : ( //render welcome message if logged in
        <div className="welcome-message">
          <h4>Welcome!</h4>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
