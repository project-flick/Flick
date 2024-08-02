const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const friendController = require('../controllers/friendController');

// Get all users excluding the current user
router.get('/all', auth, friendController.getAllUsers);

// Follow a user
router.post('/follow', auth, friendController.followUser);

// Unfollow a user
router.post('/unfollow', auth, friendController.unfollowUser);

// Get friends for the logged-in user
router.get('/', auth, friendController.getFriends);

// Get followers for the logged-in user
router.get('/followers', auth, friendController.getFollowers);

module.exports = router;