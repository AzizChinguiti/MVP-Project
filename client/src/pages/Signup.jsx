// Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleSignup = () => {
    if (password === verifyPassword) {
      const userData = {
        username,
        email,
        password
      };
      // we save user data to local storage
      localStorage.setItem('userData', JSON.stringify(userData));
      onSignup(userData);
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="signup-container"> 
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Verify Password"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <br />
      <button className="formButton" onClick={handleSignup}>Signup</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
