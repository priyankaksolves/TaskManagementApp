const express = require('express');
const router = express.Router();
const User = require('../schema/user'); // Your User schema
const verifyToken = require('../middleware/authMiddleware');

// Get logged-in user details
router.get('/me', verifyToken, async (req, res) => {
    console.log('Fetching user details for ID:', req.user.userId);
  
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      console.log('Returning user details:', user);
      res.json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Update logged-in user details
router.put('/me', verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
});

module.exports = router;
