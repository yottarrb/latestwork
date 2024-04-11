// Import necessary modules
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: ['https://frontend-rmkxhqdss-yottas-projects.vercel.app','https://manjeetdost.vercel.app','http://localhost:3000'],
    methods: ['GET', 'POST'], // Add other HTTP methods as needed
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };
  
  
  app.use(cors(corsOptions));
  

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://manjeet:manjeet@manjeet.2wuqcoj.mongodb.net/?retryWrites=true&w=majority&appName=manjeet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Define User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    // Check if password matches confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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
