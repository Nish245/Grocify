const express = require('express');
const { getUserDetails } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getUserDetails);

module.exports = router;
