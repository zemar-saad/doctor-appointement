const express = require('express');
const router = express.Router();
const { createDoctor, getDoctors,getDoctorsByCategory, getDoctorById } = require('../controllers/DoctorController');

// Routes for doctors
router.post('/doctors', createDoctor);
router.get('/doctors/getdoctors', getDoctors);
router.get('/doctors/by-category', getDoctorsByCategory);
router.get('/doctors/:id', getDoctorById);

module.exports = router;
