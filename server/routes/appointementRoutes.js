const express = require('express');
const router = express.Router();

const {createappointement,getappointements,
    deleteappointement,getAppointmentsByUserId,getAppointmentsForDoctor, 
    updateAppointmentStatus} = require('../controllers/AppointementController')

router.post('/appointement', createappointement)
router.get('/appointement/getappointement', getappointements) 
router.get('/appointement/byuserid/:id', getAppointmentsByUserId)
router.get('/appointement/fordoctor', getAppointmentsForDoctor) 

router.patch('/appointement/update/:appointmentId', updateAppointmentStatus)
router.delete('/appointement/deleteapp/:id', deleteappointement)


module.exports = router;