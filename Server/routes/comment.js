const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

// Create a new comment
router.post('/', auth, CommentController.createComment);

// Get all comments for a post
router.get('/post/:postId', auth, CommentController.getCommentsByPostId);

// Get a comment by ID
router.get('/:id', auth, CommentController.getCommentById);

// Update a comment
router.put('/:id', auth, CommentController.updateComment);

// Delete a comment
router.delete('/:id', auth, CommentController.deleteComment);

module.exports = router;