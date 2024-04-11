
import './Forms.css'; // Import CSS file for styling
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook from react-router-dom

import Dashboard from './Dashboard'; // Import the Dashboard component

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginSuccess, setLoginSuccess] = useState(false); // State for success message
  const history = useHistory(); // Get history object from useHistory hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // replace below url to https://manjeet.onrender.com/send-email while deploying
      const response = await axios.post('http://localhost:5000/api/login', formData);
      console.log('Login successful:', response.data);
      // Redirect to dashboard or show success message
      // Show simple message using alert
      alert('Login successful! Redirecting to Dashboard');
      setTimeout(() => {
        history.push('/Dashboard.js');
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error);
      // Display error message
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: 'blue', color: 'white', border: 'none' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
