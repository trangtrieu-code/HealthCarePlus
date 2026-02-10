const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointments.controller');
const userController = require("../controllers/users.controller");
const clinicsController = require('../controllers/clinics.controller');
const passwordController = require("../controllers/password.controller");
const documentsController = require("../controllers/documents.controller"); 

module.exports = (app) => {
    // Appointment routes
    router.get('/patients/:patientId/appointments', appointmentsController.findAllPatientAppointments);
    router.get('/doctors/:doctorId/appointments', appointmentsController.findAllDoctorAppointments);
    router.post('/patients/:patientId/appointments', appointmentsController.createAppointment);
    router.get('/appointments/:appointmentId', appointmentsController.findById);
    router.patch('/appointments/:appointmentId', appointmentsController.modifyById);
    router.delete('/appointments/:appointmentId', appointmentsController.cancelAppointment);

    //Clinic routes
    router.get('/clinics', clinicsController.getAllClinics);
    router.get('/clinics/:clinicId', clinicsController.getClinicById);
    router.post('/clinics', clinicsController.createClinic);

    // User Routes
    router.post("/users", userController.createUser); // Create a new user
    router.post("/users/login", userController.loginUser); 
    //router.post('/logout', appointmentsController.logOut);
    router.get("/users", userController.findAllUsers); // Retrieving all system users
    router.get("/users/:email", userController.findUserByEmail); // Get user by email (path parameter)
    router.get("/users/patient_profile", userController.getPatientProfile);
    router.patch("/users/:email", userController.modifyUserByEmail); // Modify user by email

    //TODO: make these two below functional
    // use password controller 
    // Forgot password route
    router.get("/forgot-password", passwordController.forgotPassword);
    // Reset password route
    //router.post("/reset-password", passwordController.resetPassword);

    // Document Routes
    router.post("/documents", documentsController.create);
    router.get("/documents", documentsController.findAll); // NOT BLOB!!!
    router.get("/documents/:id([0-9]+)", documentsController.findOne);


    router.get('/test', (req, res) => {
        res.json({ message: "API is working" });
    });
 
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
};