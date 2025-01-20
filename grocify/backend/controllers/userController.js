const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const {isValidPassword} = require('../controllers/authController');

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

module.exports = { getUserDetails, updatePassword };
