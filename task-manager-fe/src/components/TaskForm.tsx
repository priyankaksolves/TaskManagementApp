import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../api';

interface Task {
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

const TaskForm: React.FC = () => {
  const [task, setTask] = useState<Task>({ title: '', description: '', status: 'pending', dueDate: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask(task);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Task</h1>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <select name="status" onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <input name="dueDate" type="date" onChange={handleChange} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
