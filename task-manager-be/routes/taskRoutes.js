// routes/taskRoutes.js
const express = require('express');
const Task = require('../schema/task');
const verifyToken = require('../middleware/authMiddleware');
const Notification = require('../schema/notification');
const Friendship = require('../schema/friendship');


const router = express.Router();

// Create a New Task
router.post('/', verifyToken, async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

        // Create a notification for the user assigned to the task
        const notification = new Notification({
          userId: req.user.userId, // Assuming 'assignedTo' is the userId
          message: `You have been assigned a new task: ${task.title}`,
        });
        await notification.save();


    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Tasks
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get Tasks by Friend (My Friend's Tasks)
router.get('/friends-tasks', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find friend IDs for the logged-in user
    const friendships = await Friendship.find({ userId });
    const friendIds = friendships.map((friendship) => friendship.friendId);

    // Fetch tasks assigned to the user's friends
    const tasks = await Task.find({ assignedTo: { $in: friendIds } });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get Tasks by User (My Tasks)
router.get('/my-tasks', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ assignedTo: userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a Single Task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a Task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Tasks by User ID
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch tasks assigned to the specified user
    const tasks = await Task.find({ assignedTo: userId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
});




module.exports = router;
