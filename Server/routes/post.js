const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

// Create a new post
router.post('/', auth, postController.createPost);

// Get all posts
router.get('/', postController.getAllPosts);

// Get posts by user ID
router.get('/user', auth, postController.getUserPosts);

// Get a post by ID
router.get('/:id', postController.getPostById);

// Update a post
router.put('/:id', auth, postController.updatePost);

// Delete a post
router.delete('/:id', auth, postController.deletePost);

// Like a post
router.post('/like', auth, postController.likePost);

// Unlike a post
router.post('/unlike', auth, postController.unlikePost);

// Get likes for a post
router.get('/likes/:postId', auth, postController.getLikesForPost);

module.exports = router;