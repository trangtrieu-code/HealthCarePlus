const bcrypt = require('bcryptjs');
const moment = require('moment');
const { User } = require('../models/db');
const path = require('path');

// Retrieve all users in the system
const findAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users exist in the system' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving all system users' });
    }
};

// Create a user profile and store it
const createUser = async (req, res) => {
    console.log(req.body);

    const { email, password, first_name, family_name, phone_no, gender, dob, 
        postal_code, role, permit_number, specialty, ramq_number, health_history } = req.body;

        // if no role provided, user becomes Patient 
        const userRole = role || 'Patient';

    // Validate the request
    let isValidResult = await isUserValid(req);
    if (!isValidResult.isValid) {
        return res.status(400).json({ message: isValidResult.message });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Create the user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            first_name,
            family_name,
            phone_no,
            gender,
            dob,
            postal_code,
            role,
            permit_number: role === 'Doctor' ? permit_number : null, // Only set for doctors
            specialty: role === 'Doctor' ? specialty : null, // Only set for doctors
            ramq_number: role === 'Patient' ? ramq_number : null, // Only set for patients
            health_history: role === 'Patient' ? health_history : null, // Only set for patients
        });

        // Remove password from response before sending
        const userResponse = { ...newUser.dataValues };
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || "Oops! Something went wrong while creating a new user. Please try again."
        });
    }
};

// Find user by email
const findUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove the password before returning user details
        const userData = { ...user.dataValues };
        delete userData.password;

        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving user' });
    }
};

const modifyUserByEmail = async (req, res) => {
    const { email } = req.params;
    const { phone_no, postal_code } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if there are any changes
        let changesMade = false;

        // Only update fields if the new value differs from the current value
        if (phone_no && user.phone_no !== phone_no) {
            user.phone_no = phone_no;
            changesMade = true;
        }

        if (postal_code && user.postal_code !== postal_code) {
            user.postal_code = postal_code;
            changesMade = true;
        }

        // If no changes were made, send a "no changes" response
        if (!changesMade) {
            return res.status(200).json({ message: 'No changes were made' });
        }

        // Save the updated user
        await user.save();

        // Remove the password before returning the updated user
        const updatedUser = { ...user.dataValues };
        delete updatedUser.password;

        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user' });
    }
};

// will be used on patient_profile.html
const modifyPassword = async (req, res) => {
    const { email } = req.params;
    const { current_password, new_password } = req.body;

    try {
        // does user exist?
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // validate current password
        const isMatch = await bcrypt.compare(current_password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // hashing the new password
        const hashedPassword = await bcrypt.hash(new_password, 10);

        // updating the password
        user.password = hashedPassword;

        // save user data
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating password' });
    }
};

// Login f(x)
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    console.log("Email:", email);
    console.log("Password:", password);
  
    try {
      // find user by email
      const user = await User.findOne({ where: { email } });
  
      // comparing hashed password with input password
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (isPasswordValid) {
          res.status(200).json({ message: 'Login successful', user });
        } else {
          res.status(400).json({ error: 'Invalid email or password' });
        }
      } else {
        res.status(400).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Error logging in' });
    }
  };
  
  const getPatientProfile = async (req, res) => {
    try {
      if (req.user) { 
        // Serve the patient profile HTML page
        res.sendFile(path.join(__dirname, '../front_end/patient_profile.html'));
      } else {
        res.status(401).json({ error: 'Not authorized' });
      }
    } catch (error) {
      console.error("Error while fetching patient profile:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


// Validating user input 
const isUserValid = async (req) => {
    const { first_name, family_name, email, password, phone_no, gender, dob, role, permit_number, specialty, ramq_number, health_history } = req.body;

    // all fields filled
    if (!first_name || !family_name || !email || !password || !phone_no || !gender || !dob || !role) {
        return { isValid: false, message: 'Missing required fields' };
    }

    // email exists already?
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return { isValid: false, message: 'Email already exists' };
    }

    // validating DOB
    const birthDate = moment(dob);
    const age = moment().diff(birthDate, 'years');

    if (birthDate.isAfter(moment(), 'day')) {
        return { isValid: false, message: 'Date of birth cannot be in the future' };
    }

    if (birthDate.isBefore('1900-01-01', 'day') || age > 125) {
        return { isValid: false, message: 'Date of birth must be after 1900-01-01 and the person must not be older than 125 years' };
    }

    // If role is Doctor, ensure that permit_number and specialty are provided
    if (role === 'Doctor') {
        if (!permit_number || !specialty) {
            return { isValid: false, message: 'Doctor must have a permit number and specialty' };
        }

        // Validate permit number 
        const permitNumberRegex = /^DR\d{5}$/;
        if (!permitNumberRegex.test(permit_number)) {
            return { isValid: false, message: 'Invalid permit number format' };
        }
    }

    // If role is Patient, ensure that RAMQ number is provided
    if (role === 'Patient') {
        if (!ramq_number) {
            return { isValid: false, message: 'Patient must have a RAMQ number' };
        }

        // Validate RAMQ number format (e.g., AAA12345678)
        const ramqRegex = /^[A-Za-z]{4}\d{8}$/;
        if (!ramqRegex.test(ramq_number)) {
            return { isValid: false, message: 'Invalid RAMQ number format' };
        }
    }

    return { isValid: true };  // Valid input
};

// Exporting functions
module.exports = {
    createUser,
    findAllUsers,
    findUserByEmail,
    modifyUserByEmail,
    modifyPassword,
    loginUser,
    getPatientProfile,
};
