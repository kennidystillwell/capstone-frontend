import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/loginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/login', {
        params: { email, password },
      });

      if (response.status === 200) {
        // Login successful
        console.log(response.data);
        setError('');
      } else {
        // Login failed
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  return (
    <div>
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
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
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
    </div>
  );
};

export default LoginForm;
