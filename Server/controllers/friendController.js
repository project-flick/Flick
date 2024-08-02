const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('username profilePic');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const targetUser = await User.findById(req.body.userId);

    if (!user || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.friends.includes(req.body.userId)) {
      return res.status(400).json({ message: 'You are already friends with this user' });
    }

    user.friends.push(req.body.userId);
    targetUser.friends.push(req.user.id);

    await user.save();
    await targetUser.save();

    res.json({ message: 'User followed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const targetUser = await User.findById(req.body.userId);

    if (!user || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.friends = user.friends.filter(id => id.toString() !== req.body.userId);
    targetUser.friends = targetUser.friends.filter(id => id.toString() !== req.user.id);

    await user.save();
    await targetUser.save();

    res.json({ message: 'User unfollowed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};