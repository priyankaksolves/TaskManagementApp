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

// Get all users
router.get('/allusers', verifyToken, async (req, res) => {
  console.log('Fetching user details for ID:', req.user.userId);

  try {
    const users = await User.find({}, { _id: 1, name: 1, username: 1 }); // Fetch only necessary fields
    console.log('BE userRoutes Fetched users:', users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Failed to fetch users');
  }
});

router.get('/friends/:myUserId', verifyToken, async (req, res) => {

  try {
    const userFriends = {
      myUserId: [], // Replace `myUserId` with logged-in user ID
    };
    const { myUserId } = req.params;
    const friendIds = userFriends[myUserId] || [];
    const friends = users.filter((user) => friendIds.includes(user._id));
    res.json(friends);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Failed to fetch users');
  }
});


module.exports = router;
