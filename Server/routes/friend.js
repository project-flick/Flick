const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const friendController = require('../controllers/friendController');

// Get a list of all users
router.get('/all', auth, friendController.getAllUsers);

// Follow a user
router.post('/follow', auth, friendController.followUser);

// Unfollow a user
router.post('/unfollow', auth, friendController.unfollowUser);

module.exports = router;