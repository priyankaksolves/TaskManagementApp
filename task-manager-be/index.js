require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./databases/db'); // Import the connectDB function
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/taskRoutes'); // Import task routes
const userRoutes = require('./routes/userRoutes'); // Import user routes


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Enable CORS for all origins (use with caution in production)
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/tasks', taskRoutes); // Use task routes
app.use('/api/users', userRoutes); // Use task routes


// Welcome Route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API!');
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
