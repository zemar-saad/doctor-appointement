const mongoose = require('mongoose');

// Define the schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  }
});

// Create the model
module.exports = mongoose.model('Category', categorySchema);


