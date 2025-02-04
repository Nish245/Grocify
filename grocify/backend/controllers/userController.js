const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const { isValidPassword } = require('../controllers/authController');
const crypto = require('crypto');

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// Function to generate a secure token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Validate email format
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Get user details
const getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ username: user.username, email: user.email });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user password
const updatePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: 'Both old and new passwords are required'});
        }

        if (!isValidPassword(newPassword)) {
            return res.status(400).json({
                error: 'Password must be at least 8 characters long, including at least one letter, one number, and one special character'
            });
        }

        const user = await User.findOne({email: req.user.email});
        if (!user) {
            return res.status(404).json({ error: 'User not found'});
        }

        // Compare the old password with the stored password
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Old password is incorrect'});
        }

        // Hash the new password and update the user record
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully'});
    } catch (err) {
        res.status(500).json({ error: 'Internal server error'});
    }
};

// Forgot Password Functionality
const forgotPasswordEmail = async (req, res) => {
  const { email } = req.body;

  if (!email || !validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Generate a reset token
      const resetToken = generateToken();

      // Save the token to the user's record in the database with an expiration time
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; 
      await user.save();

      // Generate a reset link
      const resetLink = `http://localhost:3000/reset-password.html?token=${resetToken}`;

      // Email options
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Password Reset Request',
          html: `
              <p>Hello,</p>
              <p>You requested to reset your password. Click the link below to reset it:</p>
              <a href="${resetLink}">${resetLink}</a>
              <p>If you didn’t request this, please ignore this email.</p>
          `
      };

      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Password reset link sent successfully!' });
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
};

// Reset Password Functionality
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
    

  try {
      const user = await User.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
          return res.status(400).json({ error: 'Invalid or expired token' });
      }

      // Hash the new password and update the user record
      const hashedPassword = await bcrypt.hash(newPassword, 10);
            
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
         

      res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
    getUserDetails,
    updatePassword,
    forgotPasswordEmail,
    resetPassword
};
