
// routes/friendsRoutes.js
const express = require('express');
const Friendship = require('../schema/friendship');
const verifyToken = require('../middleware/authMiddleware');
const User = require('../schema/user'); // Your User schema


const router = express.Router();

// Add a friend
router.post('/friends', verifyToken, async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.userId;

    try {
      // Check if the friendship already exists
      const existingFriendship = await Friendship.findOne({ userId, friendId });
      if (existingFriendship) {
        return res.status(400).json({ message: 'User is already a friend' });
      }
  
      // Add the friendship in both directions (bidirectional)
      const newFriendship = new Friendship({ userId, friendId });
      await newFriendship.save();
  
      res.status(201).json({ message: 'Friend added successfully' });
    } catch (error) {
      console.error('Error adding friend:', error);
      res.status(500).send('Failed to add friend');
    }
  });
  

// Remove Friend
router.delete('/friends', verifyToken, async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.userId;

    try {
      // Remove the friendship from both directions
      await Friendship.deleteOne({ userId, friendId });
  
      res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
      console.error('Error removing friend:', error);
      res.status(500).send('Failed to remove friend');
    }
  });

  // Fetch friends list
  router.get('/friends', verifyToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const friendships = await Friendship.find({ userId });
      const friendIds = friendships.map((friend) => friend.friendId);
  
      const friends = await User.find({ _id: { $in: friendIds } });
      res.status(200).json(friends);
    } catch (error) {
      console.error('Error fetching friends:', error);
      res.status(500).send('Failed to fetch friends');
    }
  });
  
  

module.exports = router;
