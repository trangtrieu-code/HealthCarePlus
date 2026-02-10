const { User } = require('../models/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create a transporter using Hotmail's SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: 'MS_2UVJYt@trial-neqvygmq5yz40p7w.mlsender.net',
        pass: 'mssp.gBFbqod.z3m5jgrqme0ldpyo.vOP1bcw'
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 30000, // 30 seconds
});
// Verify email connection
transporter.verify(function(error, success) {
    if (error) {
        console.log('Email verification error:', error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

exports.forgotPassword = async (req, res) => {
    console.log('Forgot password request received');
    console.log('Request query:', req.query);

    const { email } = req.query;

    if (!email) {
        console.log('Email not provided in request');
        return res.status(400).json({ message: "Email is required." });
    }

    try {
        console.log('Searching for user with email:', email);
        const user = await User.findOne({ where: { email } });
        if (user) {
            console.log('User found:', user.email);
            
            // Generate a unique token
            const resetToken = crypto.randomBytes(20).toString('hex');
            const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

            // Save the token and expiry to the user in the database
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = resetTokenExpiry;
            await user.save();

            // Create reset URL
            const resetUrl = `http://localhost:8000/reset-password?token=${resetToken}`;

            // Send email
            const mailOptions = {
                from: 'MS_2UVJYt@trial-neqvygmq5yz40p7w.mlsender.net',
                to: user.email,
                subject: 'Password Reset',
                html: `
                    <p>You requested a password reset</p>
                    <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>
                    <p>This link will expire in 1 hour</p>
                `
            };

            await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error sending email:', error);
                        console.log('Error details:', JSON.stringify(error, null, 2));
                        reject(error);
                    } else {
                        console.log('Reset email sent:', info.response);
                        resolve(info);
                    }
                });
            });

            res.json({ 
                exists: true, 
                message: "Password reset email sent.",
                resetLink: `/reset-password?email=${email}`
            });
        } else {
            console.log('No user found with email:', email);
            res.json({ exists: false, message: "No user found with this email." });
        }
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({ message: "Error processing request", error: error.message });
    }
};