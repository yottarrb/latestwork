// Import necessary modules
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'https://frontend-rmkxhqdss-yottas-projects.vercel.app/',
    methods: ['GET', 'POST'], // Add other HTTP methods as needed
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };
  
  app.use(cors(corsOptions));
  

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a route to handle form submissions
app.post('/send-email', (req, res) => {
  // Extract form data from the request body
  const { name, email, message } = req.body;

  // Create a transporter with the necessary configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'manjeet7011416728@gmail.com', // Enter your email address
      pass: 'extjfwzezwxwhyvh' // Enter your email password or app password
    }
  });

  // Define the email options
  const mailOptions = {
    from: email, // Sender's email address
    to: 'manjeet7011416728@gmail.com', // Receiver's email address
    subject: 'New Contact Form Submission', // Subject line
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // Email body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error: Unable to send email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
