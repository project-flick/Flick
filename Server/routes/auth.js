const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Register a new user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

// Verify token
router.get('/verify', authController.verifyToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

// Get user details
router.get('/user', auth, authController.getUser);

module.exports = router;