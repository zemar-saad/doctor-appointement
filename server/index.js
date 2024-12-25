const express = require("express");
const session = require('express-session');
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const categoryRoutes = require("./routes/categoryRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");
const appointementRoutes = require('./routes/appointementRoutes'); // Adjusted typo

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to match your frontend URL
  credentials: true,
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'zemarsaad',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));



// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use('/api', doctorRoutes,appointementRoutes,categoryRoutes);

app.use('/api/auth', userRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB Connection Successful");
})
.catch((err) => {
  console.log("DB Connection Error:", err.message);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
