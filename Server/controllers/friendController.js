const User = require('../models/User');

// Get all users excluding the current user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select('username profilePic');
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userToFollow = await User.findById(req.body.userId);

    if (!user || !userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.friends.includes(req.body.userId)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    user.friends.push(req.body.userId);
    userToFollow.friendRequests.push(req.user.id);

    await user.save();
    await userToFollow.save();

    res.status(200).json({ message: 'User followed' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userToUnfollow = await User.findById(req.body.userId);

    if (!user || !userToUnfollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.friends.includes(req.body.userId)) {
      return res.status(400).json({ message: 'You are not following this user' });
    }

    user.friends = user.friends.filter((friendId) => friendId.toString() !== req.body.userId);
    userToUnfollow.friendRequests = userToUnfollow.friendRequests.filter((reqId) => reqId.toString() !== req.user.id);

    await user.save();
    await userToUnfollow.save();

    res.status(200).json({ message: 'User unfollowed' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get friends for the logged-in user
exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends', 'username profilePic');
    res.status(200).json(user.friends);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get followers for the logged-in user
exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friendRequests', 'username profilePic');
    res.status(200).json(user.friendRequests);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};