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

// Like a post
router.post('/:id/like', auth, PostController.likePost);

// Unlike a post
router.delete('/:id/like', auth, PostController.unlikePost);

// Get likes for a post
router.get('/:id/likes', auth, PostController.getPostLikes);

module.exports = router;