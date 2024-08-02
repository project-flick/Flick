const Like = require('../models/Like');
const Post = require('../models/Post');
const User = require('../models/User');

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if the user already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'User already liked this post' });
    }

    post.likes.push(userId);
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likes = post.likes.filter(id => id.toString() !== userId);
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get likes of a post
exports.getLikesForPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('likes', 'username profilePic');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post.likes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};