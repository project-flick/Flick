const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');
const AuthController = require('../controllers/authController');

// Create a new comment
router.post('/', AuthController.verifyToken, CommentController.createComment);

// Get all comments
router.get('/', AuthController.verifyToken, CommentController.getAllComments);

// Get a comment by ID
router.get('/:id', AuthController.verifyToken, CommentController.getCommentById);

// Update a comment
router.put('/:id', AuthController.verifyToken, CommentController.updateComment);

// Delete a comment
router.delete('/:id', AuthController.verifyToken, CommentController.deleteComment);

module.exports = router;