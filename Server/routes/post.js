const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const auth = require('../middleware/auth');

// Create a new post
router.post('/', auth, PostController.createPost);

// Get all posts
router.get('/', auth, PostController.getAllPosts);

// Get a post by ID
router.get('/:id', auth, PostController.getPostById);

// Update a post
router.put('/:id', auth, PostController.updatePost);

// Delete a post
router.delete('/:id', auth, PostController.deletePost);

module.exports = router;