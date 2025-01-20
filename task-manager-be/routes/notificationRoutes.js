
// routes/notificationRoutes.js
const express = require('express');
const Notification = require('../schema/notification');
const verifyToken = require('../middleware/authMiddleware');


const router = express.Router();

// Make notification read
router.post('/api/notifications/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
      );
      res.json(notification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/notifications - Get all notifications for the logged-in user
router.get('/', verifyToken, async (req, res) => {
    try {
    
        console.log('req', req.user.userId);

      // Assuming the user ID is available after token verification in req.user
      const userId = req.user.userId;
  
      // Fetch all notifications for the user
      const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
  
      return res.json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ message: 'Failed to fetch notifications' });
    }
  });

module.exports = router;
