const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/likeController');
const auth = require('../middleware/auth');

// Like a post
router.post('/like', auth, LikeController.likePost);

// Unlike a post
router.post('/unlike', auth, LikeController.unlikePost);

// Get likes of a post
router.get('/post/:postId', auth, LikeController.getLikesByPost);

module.exports = router;