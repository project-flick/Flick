const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const AuthController = require('../controllers/authController');

// Create a new post
router.post('/', AuthController.verifyToken, PostController.createPost);

// Get all posts
router.get('/', AuthController.verifyToken, PostController.getAllPosts);

// Get a post by ID
router.get('/:id', AuthController.verifyToken, PostController.getPostById);

// Update a post
router.put('/:id', AuthController.verifyToken, PostController.updatePost);

// Delete a post
router.delete('/:id', AuthController.verifyToken, PostController.deletePost);

module.exports = router;