import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../api';

interface Task {
  title: string;
  description: string;
  status: string;
  dueDate: string;
  startTime: string;
  stopTime: string;
}

const TaskForm: React.FC = () => {
  const [task, setTask] = useState<Task>({ title: '', description: '', status: 'pending', dueDate: '',   startTime: '',
    stopTime: '', });
    const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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
    <form onSubmit={handleSubmit}>
      <h1>Add Task</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
          Due Date:
          <input
            name="dueDate"
            type="date"
            value={task.dueDate}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Start Time:
          <input
            name="startTime"
            type="time"
            value={task.startTime}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Stop Time:
          <input
            name="stopTime"
            type="time"
            value={task.stopTime}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
};

export default TaskForm;
