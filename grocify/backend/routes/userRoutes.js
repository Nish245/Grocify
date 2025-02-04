const express = require('express');
const { getUserDetails, updatePassword, forgotPasswordEmail, resetPassword } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getUserDetails);
router.post('/forgotPasswordEmail', forgotPasswordEmail);
router.post('/resetPassword', resetPassword);
router.put('/updateUserPassword', verifyToken, updatePassword);

module.exports = router;
