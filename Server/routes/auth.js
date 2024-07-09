const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Register a new user
router.post('/register', AuthController.register);

// Login a user
router.post('/login', AuthController.login);

// Verify token
router.get('/verify', AuthController.verifyToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

router.get('/user', auth, authController.getUser);

module.exports = router;