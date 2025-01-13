import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correctly import `useNavigate`
import { deleteTask, getTasks } from '../api';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Correctly initialize the state
  const navigate = useNavigate(); // Initialize `useNavigate` for navigation

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data); // Update state with tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      fetchTasks(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => navigate(`/edit-task/${task._id}`)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
