const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/likeController');
const AuthController = require('../controllers/authController');

// Like a post
router.post('/', AuthController.verifyToken, LikeController.likePost);

// Unlike a post
router.delete('/:postId', AuthController.verifyToken, LikeController.unlikePost);

// Get all likes for a post
router.get('/:postId', AuthController.verifyToken, LikeController.getLikes);

module.exports = router;