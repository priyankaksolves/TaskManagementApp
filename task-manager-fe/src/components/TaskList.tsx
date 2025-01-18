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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
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
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const openDeleteModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  return (
    <div className='task-list-container'>
      <h1>Task List</h1>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>Title: {task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>
            <p>Created Date: {task.dueDate}</p>
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
