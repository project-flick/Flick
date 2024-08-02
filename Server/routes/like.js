const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { likePost, unlikePost, getLikesForPost } = require('../controllers/likeController');

// Like a post
router.post('/like', auth, likePost);

// Unlike a post
router.post('/unlike', auth, unlikePost);

// Get likes for a post
router.get('/post/:postId', auth, getLikesForPost);

module.exports = router;