import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask, fetchUsers } from '../api';
import styles from '../styles/TaskForm.module.css'

interface Task {
  title: string;
  description: string;
  status: string;
  dueDate: string;
  startTime: string;
  stopTime: string;
  assignedTo: string;
}

interface User {
  _id: string;
  name: string;
  username: string;
}

const TaskForm: React.FC = () => {
  const [task, setTask] = useState<Task>({ title: '', description: '', status: 'pending', dueDate: '',   startTime: '',
    stopTime: '', assignedTo: ''});
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    console.log(error);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        console.log('Fetched usersData:', usersData);
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          throw new Error('API did not return an array');
        }
      } catch (err) {
        setError('Failed to load users.');
        console.error('Error loading users:', err);
        setUsers([]); // Ensure users is an array even if an error occurs
      }
    };
  
    loadUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Check if startTime is greater than stopTime
    if (task.startTime && task.stopTime && task.startTime > task.stopTime) {
      setError('Start time cannot be greater than stop time.');
      return;
    }

    try {
      await createTask(task);
      navigate('/tasks');
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles['form-container']}>
      <h1>Add Task</h1>

      <div>
        <label>
          Title:
          <input
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Status:
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Assign To:
          <select name="assignedTo" value={task.assignedTo} onChange={handleChange} required>
            <option value="" disabled>Select a user</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name || user.username}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Due Date:
          <input
            name="dueDate"
            type="datetime-local"
            value={task.dueDate}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <button className={styles['task-form-btn']} type="submit">Add Task</button>
      </div>
    </form>
  );
};

export default TaskForm;
