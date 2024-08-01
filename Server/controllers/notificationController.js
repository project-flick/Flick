const Notification = require('../models/Notification');

// Get notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    notification.read = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id, read: false }, { read: true });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};