import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask, getTasks } from '../api';
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
  const [statusFilter, setStatusFilter] = useState<string>('all'); // Status filter state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  const formatDateTimeForDisplay = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Converts to local date and time
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks(); // Re-filter tasks whenever the status filter changes
  }, [statusFilter, tasks]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
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

  const filterTasks = () => {
    if (statusFilter === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === statusFilter));
    }
  };

  const handleDelete = async () => {
    if (!selectedTaskId) return;
    try {
      await deleteTask(selectedTaskId);
      setIsModalOpen(false);
      setSelectedTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const openDeleteModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className='task-list-container'>
      <h1>Task List</h1>
      <div className="filter-container">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
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
