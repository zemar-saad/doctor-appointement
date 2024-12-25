const User = require('../models/UserModel');
const Doctor = require("../models/DoctorModel")
const bcrypt = require('bcrypt');

// Login Controller
module.exports.login = async (req, res, next) => {
  try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.json({ msg: "Incorrect Username or Password", status: false });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.json({ msg: "Incorrect Username or Password", status: false });

      // Fetch doctor details if user role is doctor
      let doctorId = null;
      if (user.role === 'doctor') {
          const doctor = await Doctor.findOne({ user: user._id });
          if (doctor) {
              doctorId = doctor._id;
              console.log(doctorId)
          }
      }

      // Remove password before sending user data
      delete user.password;

      // Set user and doctor ID in session
      req.session.user = user;
      console.log(user)
      req.session.doctorId = doctorId; // Store doctor ID in session

      return res.json({ status: true, user, doctorId });
  } catch (ex) {
      next(ex);
  }
};

  
// Register Controller
module.exports.register = async (req, res, next) => {
    try {
        const { username, password, email,role } = req.body;

        // Check if username or email already exists
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) return res.json({ msg: "Username already exists", status: false });
        
        const emailCheck = await User.findOne({ email });
        if (emailCheck) return res.json({ msg: "Email already exists", status: false });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        // Remove password before sending user data
        delete user.password;
        
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

// Logout Controller
module.exports.logOut = (req, res, next) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ msg: 'Failed to log out', status: false });
        }
  
        // Clear the session cookie
        res.clearCookie('connect.sid', { path: '/' }); // Ensure the cookie name and path match your session config
  
        return res.json({ status: true, msg: 'Logged out successfully' });
      });
    } catch (ex) {
      next(ex);
    }
  };
  

// Get User Details Controller

module.exports.getUserDetails = (req, res, next) => {
    try {
        // Check if the session exists and if the user is authenticated
        if (!req.session || !req.session.user) {
            return res.status(401).json({ msg: "User not authenticated", status: false });
        }
        
        // Send user details
        return res.json({ status: true, user: req.session.user });
    } catch (ex) {
        next(ex);
    }
};



// Get all users
module.exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find({}, 'username email'); // Only fetch username and email fields

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }

    res.status(200).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



