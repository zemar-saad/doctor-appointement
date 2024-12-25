const Doctor = require('../models/DoctorModel');
const Category = require('../models/CategoryModel');
const User = require("../models/UserModel")

// Create a new doctor
const createDoctor = async (req, res) => {
  try {
    const { name, address, patients, phone, yearsOfExperience, startTime, endTime, about, premium, image, categoryId,userId } = req.body;

    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find the category by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the doctor
    const doctor = await Doctor.create({
      name,
      address,
      patients,
      phone,
      yearsOfExperience,
      startTime,
      endTime,
      premium,
      image,
      about,
      category: categoryId, // Associate doctor with category
      user: userId, // Associate doctor with user
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all doctors with their associated categories
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('category').populate('user', "username email role"); // Populate category field
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get doctors by category name
const getDoctorsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.query;
    if (!categoryName) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Find the category by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Fetch doctors associated with the category
    const doctors = await Doctor.find({ category: category._id }).populate('category').populate("user",'username email role');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).populate('category').populate("user",'username email role');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDoctor, getDoctors, getDoctorsByCategory , getDoctorById};
