// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './Forms.css'; // Import CSS file for styling

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // replace below url to https://manjeet.onrender.com/send-email while deploying
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log('Registration successful:', response.data);
      // Redirect to login page or show success message
      // Show simple message using alert
      alert('Registration successful! Now you can login.');
      setFormData({
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Registration failed:', error);
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: 'blue', color: 'white', border: 'none' }}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
