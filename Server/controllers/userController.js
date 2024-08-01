const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Notification = require('../models/Notification');
const Post = require('../models/Post');

const JWT_SECRET = 'your_jwt_secret';

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful');
    res.json({ token, user });
  } catch (err) {
    console.log('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify token 
exports.verifyToken = (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
};

// Get user details
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Send friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user.id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.friendRequests.includes(friendId) || user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    friend.friendRequests.push(user.id);
    await friend.save();

    res.status(200).json({ message: 'Friend request sent' });

    // Create notification for the friend request
    const notification = new Notification({
      user: friend.id,
      type: 'friend_request',
      message: `${user.username} has sent you a friend request.`,
    });
    await notification.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Accept friend request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user.id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({ message: 'Friend request not found' });
    }

    user.friends.push(friendId);
    user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);
    friend.friends.push(user.id);

    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend request accepted' });

    // Create notification for the friend acceptance
    const notification = new Notification({
      user: friend.id,
      type: 'friend_acceptance',
      message: `${user.username} has accepted your friend request.`,
    });
    await notification.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Reject friend request
exports.rejectFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({ message: 'Friend request not found' });
    }

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);
    await user.save();

    res.status(200).json({ message: 'Friend request rejected' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    const user = await User.findById(req.user.id);

    if (username) user.username = username;
    if (bio) user.bio = bio;

    if (req.file) {
      user.profilePic = req.file.filename;
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get user posts
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.id });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};