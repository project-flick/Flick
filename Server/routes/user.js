const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');

// Create a new user
router.post('/', AuthController.verifyToken, UserController.createUser);

// Get all users
router.get('/', AuthController.verifyToken, UserController.getAllUsers);

// Get a user by ID
router.get('/:id', AuthController.verifyToken, UserController.getUserById);

// Update a user
router.put('/:id', AuthController.verifyToken, UserController.updateUser);

// Delete a user
router.delete('/:id', AuthController.verifyToken, UserController.deleteUser);

module.exports = router;