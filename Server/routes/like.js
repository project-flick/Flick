const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const auth = require('../middleware/auth');

// Like a post
router.post('/', auth, likeController.likePost);

// Unlike a post
router.post('/unlike', auth, likeController.unlikePost);

// Get likes for a post
router.get('/post/:postId', auth, likeController.getLikesForPost);

module.exports = router;