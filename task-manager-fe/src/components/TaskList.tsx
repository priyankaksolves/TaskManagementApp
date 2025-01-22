import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask, getTasks, getTasksByUser, getTasksByFriend } from '../api';
import { AxiosError } from 'axios';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  startTime: string;
  stopTime: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filterOption, setFilterOption] = useState<string>('all'); // Filter by All, My Tasks, My Friend's Tasks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  const myUserId = localStorage.getItem("userId") || ""; // Get the logged-in user's ID

  const formatDateTimeForDisplay = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Converts to local date and time
  };

  useEffect(() => {
    fetchTasks();
  }, [filterOption]); // Re-fetch tasks when filter option changes

  const fetchTasks = async () => {
    try {
      let response;

      // Fetch tasks based on selected filter
      if (filterOption === 'all') {
        response = await getTasks();
      } else if (filterOption === 'my-tasks') {
        response = await getTasksByUser();
      } else if (filterOption === 'friends-tasks') {
        response = await getTasksByFriend();
      }

      debugger;
      const formattedTasks = response.data.map((task: Task) => ({
        ...task,
        dueDate: formatDateTimeForDisplay(task.dueDate), // Format the dueDate
      }));

      setTasks(formattedTasks);
      setFilteredTasks(formattedTasks); // Initialize filtered tasks
    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        navigate('/login');
      }
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedTaskId) return;
    try {
      await deleteTask(selectedTaskId);
      setIsModalOpen(false);
      setSelectedTaskId(null);
      fetchTasks(); // Re-fetch tasks after delete
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const openDeleteModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(e.target.value);
  };

  return (
    <div className='task-list-container'>
      <h1>Task List</h1>

      <div className="filter-container">
        <label htmlFor="filterOption">Filter Tasks:</label>
        <select
          id="filterOption"
          value={filterOption}
          onChange={handleFilterChange}
        >
          <option value="all">All Tasks</option>
          <option value="my-tasks">My Tasks</option>
          <option value="friends-tasks">My Friend's Tasks</option>
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task._id}>
            <h3>Title: {task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.dueDate}</p>
            <div className='task-actions'>
              <button onClick={() => navigate(`/edit-task/${task._id}`)}>Edit</button>
              <button onClick={() => openDeleteModal(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTaskId(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TaskList;
