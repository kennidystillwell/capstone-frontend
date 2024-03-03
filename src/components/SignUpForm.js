import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/SignUp.css';

const SignUpForm = () => {
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
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phoneNum: phone,
          password,
          securityQuestion1: securityQuestion,
          answerSecQues1: '',
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        setError(data.error);
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
            />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="input-field">
            <input
              id="last_name"
              type="text"
              className="validate"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="last_name">Last Name</label>
          </div>
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
              id="phone"
              type="tel"
              className="validate"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone">Phone Number</label>
          </div>
          <div className="input-field password-input">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="validate"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
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
            />
            <label htmlFor="security_question">Security Question: What is your mother's maiden name?</label>
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
