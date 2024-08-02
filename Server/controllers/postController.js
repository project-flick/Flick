const Post = require('../models/Post');
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

// Create a new post
exports.createPost = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { content } = req.body;
      const image = req.file ? req.file.filename : null;
      const post = new Post({
        userId: req.user.id,
        content,
        image,
      });
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username profilePic');
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get posts by user ID
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.id }).populate('userId', 'username profilePic');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.status(200).json({ message: 'Post liked' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: 'Post not liked yet' });
    }

    post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    await post.save();

    res.status(200).json({ message: 'Post unliked' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get likes for a post
exports.getLikesForPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('likes', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post.likes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};