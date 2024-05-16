// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // this Hook used for navigation

  const handleLogin = () => {
    // we're going to retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.username === username && userData.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
      navigate('/'); // Redirect to the main page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container"> 
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="formButton" onClick={handleLogin}>Login</button> 
      {error && <p>{error}</p>}
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
  );
};

export default Login;
