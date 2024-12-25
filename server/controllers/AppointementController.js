const appointement = require('../models/AppointementModel'); // Import the appointement model
const Doctor = require('../models/DoctorModel'); // Import the Doctor model (for reference checks)
const User = require('../models/UserModel');

// Create an appointement
const createappointement = async (req, res) => {
  const {  date, time, doctorId, note ,userId} = req.body;

  // Basic validation
  if ( !date || !time || !doctorId || !userId) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found.' });
    }
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Doctor not found.' });
    }


    // Create a new appointement
    const newappointement = new appointement({
      user: userId,
      date,
      time,
      doctor: doctorId, // Reference to the Doctor model
      note: note || "", // Set to an empty string if note is not provided
    });

    // Save the appointement
    const savedappointement = await newappointement.save();

    res.status(201).json({
      message: 'appointement created successfully',
      appointement: savedappointement,
    });
  } catch (error) {
    console.error('Error creating appointement:', error);
    res.status(500).json({ error: 'Server error' });
  }
};




// Get all appointements
const getappointements = async (req, res) => {
  try {
    // Fetch all appointements and populate the doctor field
    const appointements = await appointement.find()
      .populate('doctor' ,'name') // Populating only specific fields from the Doctor model
      .populate('user', 'username email'); 

    if (!appointements || appointements.length === 0) {
      return res.status(404).json({ message: 'No appointements found.' });
    }

    res.status(200).json({
      message: 'appointements fetched successfully',
      appointements,
    });
    
  } catch (error) {
    console.error('Error fetching appointements:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// get appointement by user id (show only appointements of logged user)
  const getAppointmentsByUserId = async (req, res) => {
    //console.log('Request parameters:', req.params); 
    const userId = req.params.id;  // Extract userId from URL parameters
    //console.log('Received userId:', userId);

    try {
      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
      }

      // Fetch appointments for the specific user and populate related fields
      const appointments = await appointement.find({ user: userId })
        .populate('doctor', 'name')  // Populate doctor field
        .populate('user', 'username email');  // Populate user field

      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found for this user.' });
      }

      res.status(200).json({
        message: 'Appointments fetched successfully',
        appointments,
      });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };



// Get appointments for the logged-in doctor (bydoctorid)
const getAppointmentsForDoctor = async (req, res) => {
  try {
      const doctorId = req.session.doctorId; // Get the doctor's ID from the session
      if (!doctorId) {
          return res.status(401).json({ message: 'Doctor not authenticated' });
      }

      // Fetch appointments for the specific doctor
      const appointments = await appointement.find({ doctor: doctorId })
          .populate('doctor', 'name') // Optionally populate doctor field
          .populate('user', 'username email'); // Optionally populate user field

      if (!appointments || appointments.length === 0) {
          return res.status(404).json({ message: 'No appointments found for this doctor.' });
      }

      res.status(200).json({
          message: 'Appointments fetched successfully',
          appointments,
      });
  } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'Server error' });
  }
};

//Get appointments by doctor id (not auth maybe for admin later..)
{/*const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const doctorId  = req.params.id;

    if (!doctorId) {
      return res.status(400).json({ message: 'Doctor ID is required' });
    }

    const appointments = await appointement.find({ doctor: doctorId })
      .populate('doctor', 'name')
      .populate('user', 'username email');

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this doctor.' });
    }

    res.status(200).json({
      message: 'Appointments fetched successfully',
      appointments,
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
*/}



// Update the status of an appointment
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status, rejectionReason } = req.body; // Expecting status and optional rejectionReason
    const { appointmentId } = req.params; // Expecting appointmentId in the URL
    console.log(appointmentId)

    // Validate status
    if (!['confirmed', 'rejected', 'completed','expired' ,'pending'].includes(status)) {
      return res.status(400).json({ status: false, msg: 'Invalid status.' });
    }

    // Find the appointment
    const appointment = await appointement.findById(appointmentId); // Use the correct model name
    if (!appointment) {
      return res.status(404).json({ status: false, msg: 'Appointment not found.' });
    }

    // Update appointment status
    appointment.status = status;

    // Update rejection reason if the status is rejected
    if (status === 'rejected') {
      appointment.rejectionReason = rejectionReason || ''; // Set rejection reason if provided
    } else {
      appointment.rejectionReason = ''; // Clear rejection reason if not rejected
    }

    // Save the updated appointment
    await appointment.save();

    return res.json({ status: true, msg: 'Appointment status updated successfully.' });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    next(error);
  }
};


// delete appoitement
const deleteappointement = async (req, res) => {
  const { id } = req.params; // Get the ID from request parameters

  try {
    // Find and delete the appointement
    const deletedappointement = await appointement.findByIdAndDelete(id);

    if (!deletedappointement) {
      return res.status(404).json({ error: 'appointement not found.' });
    }

    res.status(200).json({
      message: 'appointement deleted successfully',
      appointement: deletedappointement,
    });
  } catch (error) {
    console.error('Error deleting appointement:', error);
    res.status(500).json({ error: 'Server error' });
  }
};




module.exports = { createappointement ,getappointements ,deleteappointement 
  ,getAppointmentsByUserId ,getAppointmentsForDoctor ,updateAppointmentStatus};