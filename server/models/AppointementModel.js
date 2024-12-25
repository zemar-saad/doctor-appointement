// models/AppointmentModel.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  note: {
    type: String,
    trim: true,
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed','expired', 'rejected'], 
    default: 'pending'  
  },
  rejectionReason: { 
    type: String, 
    default: ''  
  },

});

module.exports = mongoose.model('Appointment', appointmentSchema);
