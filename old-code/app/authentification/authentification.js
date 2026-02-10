const bcrypt = require('bcryptjs');
const { User } = require('../models/db');

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

// Function to handle login
const login = async (req, res) => {
    const email = req.headers['x-auth-email']; // Get email from request headers
    const password = req.headers['x-auth-password']; // Get password from request headers

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required'
        });
    }

    try {
        // Find user by email
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(403).json({
                error: 'Invalid email or password'
            }); // Invalid email
        }

        // Compare provided password with stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(403).json({
                error: 'Invalid email or password'
            }); // Invalid password
        }

        // If the password is correct, return the user data (without the password)
        const userData = {
            ...user.dataValues
        };
        delete userData.password;

        res.status(200).json(userData); // Send user data as response
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error logging in user'
        }); // Server error
    }
/*
    // Function to handle logout
    const logout = (session) => {
        return new Promise((resolve, reject) => {
            session.destroy((err) => {
                if (err) {
                    reject('Error logging out');
                } else {
                    resolve('Logged out successfully');
                }
            });
        });
    };
    */

    // Export login function
    module.exports = {
        login,
        //logout
    };
};
