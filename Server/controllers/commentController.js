const Comment = require('../models/Comment');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get comments for a post
exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate('userId', 'username');
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};