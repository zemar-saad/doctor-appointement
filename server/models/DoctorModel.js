const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  patients: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: String,
    required: true,
  },
  startTime: {
    type: String, // or Date, depending on how you want to handle time format
    required: true,
  },
  endTime: {
    type: String, // or Date, depending on how you want to handle time format
    required: true,
  },
  about: {
    type: String, // using a simple string for rich text content
    required: true,
  },
  image: {
    type: String, // for storing image URLs
    required: true,
  },
  premium: {
    type: Boolean,
    default: false, // default value is false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // reference to the Category model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // reference to the user model
    required: true,
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
