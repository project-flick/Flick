const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/auth');

// Get notifications for a user
router.get('/', auth, notificationController.getUserNotifications);

// Mark notification as read
router.put('/:id/read', auth, notificationController.markAsRead);

// Mark all notifications as read
router.put('/read-all', auth, notificationController.markAllAsRead);

module.exports = router;