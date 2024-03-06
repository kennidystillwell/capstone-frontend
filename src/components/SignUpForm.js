import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/SignUp.css';
import axios from 'axios';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        first_name: firstName,
        last_name: lastName,
        email,
        phoneNum: phone,
        password,
        answerSecuQuest1: securityQuestion,
      });

      if (response.status === 200) {
        console.log(response.data.message);
        navigate('/login'); //redirect to the login page upon successful account creation
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <div className="sign-up-container">
        <h4>Create an Account</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              id="first_name"
              type="text"
              className="validate"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
          </div>
          <div className="input-field">
            <input
              id="last_name"
              type="text"
              className="validate"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="input-field">
            <input
              id="email"
              type="email"
              className="validate"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-field">
            <input
              id="phone"
              type="tel"
              className="validate"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
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
              required
            />
            <button
              type="button"
              className="btn-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="input-field">
            <input
              id="security_question"
              type="text"
              className="validate"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              placeholder="Security Question: What is your mother's maiden name?"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
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
