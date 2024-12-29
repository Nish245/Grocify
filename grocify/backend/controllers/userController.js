const User = require('../models/userModel');

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

module.exports = { getUserDetails };
