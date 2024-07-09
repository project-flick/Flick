const Like = require('../models/Like');
const Post = require('../models/Post');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) return res.status(400).json({ message: 'Post already liked' });

    const newLike = new Like({ postId, userId });
    await newLike.save();

    // Optionally update the post's like count
    await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

    res.status(201).json(newLike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const like = await Like.findOneAndDelete({ postId, userId });
    if (!like) return res.status(404).json({ message: 'Like not found' });

    // Optionally update the post's like count
    await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });

    res.status(200).json({ message: 'Post unliked' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all likes for a post
exports.getLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const likes = await Like.find({ postId });
    res.status(200).json(likes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};