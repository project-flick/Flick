const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const auth = require('../middleware/auth');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

// Get user profile
router.get('/profile', auth, UserController.getUserProfile);

// Get user posts
router.get('/posts', auth, UserController.getUserPosts);

// Update user profile
router.put('/profile', auth, UserController.updateUserProfile);

// Update user profile picture
router.put('/profile/pic', auth, upload.single('profilePic'), UserController.updateProfilePicture);

module.exports = router;