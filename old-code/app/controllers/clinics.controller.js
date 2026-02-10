const { Clinic } = require('../models/db');

// POST a clinic
const createClinic = async(req, res) => {
    const { clinic_id, name, address, phone_number } = req.body;

    try {
        const newClinic = await Clinic.create({
            clinic_id,
            name,
            address,
            phone_number   
        });

        res.status(201).json(newClinic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating clinic' });
    }
}

// GET all clinics
const getAllClinics = async (req, res) => {
    try {
        // Fetch all clinics from the Clinic model
        const clinics = await Clinic.findAll();

        if (clinics.length === 0) {
            return res.status(404).json({ message: 'No clinics found' });
        }

        res.status(200).json(clinics);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving clinics' });
    }
};

// GET a clinic by its ID
const getClinicById = async (req, res) => {
    const { clinicId } = req.params;

    try {
        // Find the clinic by its ID
        const clinic = await Clinic.findByPk(clinicId);

        if (!clinic) {
            return res.status(404).json({ message: 'Clinic not found' });
        }

        res.status(200).json(clinic);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving clinic' });
    }
};

module.exports = {
    createClinic,
    getAllClinics,
    getClinicById
}