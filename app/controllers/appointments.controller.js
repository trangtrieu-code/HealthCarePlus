const { Appointment, User, Clinic } = require('../models/db');

// Function to GET all appointments for a specific patient
const findAllPatientAppointments = async (req, res) => {
    const { patientId } = req.params;

    try {
        // Find all appointments for the patient
        const appointments = await Appointment.findAll({
            where: { patient_id: patientId }
        });

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this patient' });
        }

        const upcomingAppointments = [];
        const pastAppointments = [];

        const today = new Date();
        appointments.forEach(appointment => {
            const appointmentDate = new Date(appointment.appointment_date);
            if (appointmentDate >= today) {
                upcomingAppointments.push(appointment);
            } else {
                pastAppointments.push(appointment);
            }
        });

        res.status(200).json({ upcoming: upcomingAppointments, past: pastAppointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving appointments' });
    }
};

// Function to GET all appointments for a specific doctor
const findAllDoctorAppointments = async (req, res) => {
    const { doctorId } = req.params;  // Get doctor ID from URL params

    try {
        // Find all appointments for the doctor
        const appointments = await Appointment.findAll({
            where: { doctor_id: doctorId }
        });

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this doctor' });
        }

        res.status(200).json(appointments);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving appointments' });
    }
};

// Function to POST an appointment for a patient
const createAppointment = async (req, res) => {
    const { patientId } = req.params;  // Get patient ID from URL params
    const { doctor_id, clinic_id, appointment_date, status } = req.body;

    try {
        // Validate patient
        const patient = await User.findByPk(patientId);
        if (!patient || patient.role !== 'Patient') {
            return res.status(404).json({ error: 'Patient not found or invalid role' });
        }

        // Validate doctor
        const doctor = await User.findByPk(doctor_id);
        if (!doctor || doctor.role !== 'Doctor') {
            return res.status(404).json({ error: 'Doctor not found or invalid role' });
        }

        // Validate clinic
        const clinic = await Clinic.findByPk(clinic_id);
        if (!clinic) {
            return res.status(404).json({ error: 'Clinic not found' });
        }

        // Validate appointment date
        const appointmentDate = new Date(appointment_date);

        const today = new Date();
        appointmentDate.setHours(23,59,59,0)
        console.log(`Appointment Date: ${appointmentDate}, Current Date: ${today}`);
        
        if (appointmentDate <= today) {
            return res.status(400).json({ error: 'Appointment date must be today or later.' });
        }

        // Create the appointment
        const appointment = await Appointment.create({
            patient_id: patientId,
            doctor_id,
            clinic_id,
            appointment_date,
            status: status || 'Scheduled'  // Default status is 'Scheduled'
        });

        res.status(201).json(appointment);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating appointment' });
    }
};

// Function to GET an appointment by its ID
const findById = async (req, res) => {
    const { appointmentId } = req.params;  // Get appointment ID from URL params

    try {
        // Find the appointment by ID
        const appointment = await Appointment.findByPk(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json(appointment);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving appointment' });
    }
};

// Function to PATCH an appointment by its ID (e.g., change date or doctor)
const modifyById = async (req, res) => {
    const { appointmentId } = req.params;  // Get appointment ID from URL params
    const { doctor_id, clinic_id, appointment_date, status } = req.body;

    try {
        // Find the appointment by ID
        const appointment = await Appointment.findByPk(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Update the appointment with new details (if provided)
        if (doctor_id) {
            appointment.doctor_id = doctor_id;
        }

        if (clinic_id) {
            appointment.clinic_id = clinic_id;
        }

        if (appointment_date) {
            const appointmentDate = new Date(appointment_date);
            if (appointmentDate <= new Date()) {
                return res.status(400).json({ error: 'Appointment date must be today or later' });
            }
            appointment.appointment_date = appointment_date;
        }

        if (status) {
            appointment.status = status;
        }

        // Save the updated appointment
        await appointment.save();

        res.status(200).json({ message: 'Appointment updated successfully', appointment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error modifying appointment' });
    }
};

// Function to cancel (DELETE) an appointment by its ID
const cancelAppointment = async (req, res) => {
    const { appointmentId } = req.params;  // Get appointment ID from URL params

    try {
        // Find the appointment by ID
        const appointment = await Appointment.findByPk(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Only allow cancellation if the appointment is not already completed or cancelled
        if (appointment.status === 'Completed' || appointment.status === 'Cancelled') {
            return res.status(400).json({ error: 'Cannot cancel an already completed or cancelled appointment' });
        }

        // Update the appointment's status to 'Cancelled'
        appointment.status = 'Cancelled';
        await appointment.save();

        res.status(200).json({ message: 'Appointment successfully cancelled', appointment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error cancelling appointment' });
    }
};



// Exporting the functions
module.exports = {
    createAppointment,
    findAllPatientAppointments,
    findAllDoctorAppointments,
    findById,
    modifyById,
    cancelAppointment,
    
};
