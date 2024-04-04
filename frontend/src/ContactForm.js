// ContactForm.js
import React, { useState } from 'react';
import './ContactForm.css';


function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isEmailSent, setIsEmailSent] = useState(false); // State to track email sent status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch('https://manjeet.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Email sent successfully');
        setIsEmailSent(true); // Set email sent status to true
      } else {
        console.error('Failed to send email');
        // Add any error handling here (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Add any error handling here (e.g., display an error message)
    }
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      {!isEmailSent ? ( // Render form if email is not sent
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : ( // Render success message if email is sent successfully
        <div className="success-message">
          <p>Email sent successfully! We'll get back to you soon.</p>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
