const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

// Get user profile
router.get('/profile', auth, userController.getUserProfile);

// Update user profile
router.put('/profile', auth, upload.single('profilePic'), userController.updateUserProfile);

// Send friend request
router.post('/friend-request', auth, userController.sendFriendRequest);

// Accept friend request
router.post('/accept-friend-request', auth, userController.acceptFriendRequest);

// Reject friend request
router.post('/reject-friend-request', auth, userController.rejectFriendRequest);

// Get user posts
router.get('/posts', auth, userController.getUserPosts);

module.exports = router;