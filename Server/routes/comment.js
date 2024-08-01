const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

// Create a new comment
router.post('/', auth, commentController.createComment);

// Get all comments
router.get('/', auth, commentController.getAllComments);

// Get a comment by ID
router.get('/:id', auth, commentController.getCommentById);

// Update a comment
router.put('/:id', auth, commentController.updateComment);

// Delete a comment
router.delete('/:id', auth, commentController.deleteComment);

// Get comments for a post
router.get('/post/:postId', auth, commentController.getCommentsForPost);

module.exports = router;