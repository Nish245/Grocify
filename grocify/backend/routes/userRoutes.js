const express = require('express');
const { getUserDetails, updatePassword } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getUserDetails);
router.put('/updateUserPassword', verifyToken, updatePassword);

module.exports = router;
