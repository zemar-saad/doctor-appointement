const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 30
    },
    role: {
        type: String,
        enum: ['patient', 'doctor'], // Define roles as patient or doctor
        default: 'patient' // Default to patient
    }
});

module.exports = mongoose.model("Users", userSchema);
