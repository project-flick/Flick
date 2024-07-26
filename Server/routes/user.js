const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Create a new user
router.post('/', AuthController.register);

// Get all users
router.get('/', auth, UserController.getAllUsers);

// Get a user by ID
router.get('/:id', auth, UserController.getUserById);

// Get user profile
router.get('/profile', auth, UserController.getUserProfile);

// Update a user
router.put('/profile', auth, UserController.updateUser);

// Delete a user
router.delete('/profile', auth, UserController.deleteUser);

module.exports = router;