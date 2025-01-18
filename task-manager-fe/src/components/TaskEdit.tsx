import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask } from '../api'; // Import the necessary API functions

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  startTime: string;
  stopTime: string;
}

const EditTask: React.FC = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const navigate = useNavigate();
  const [task, setTasks] = useState<Task | null>(null); // State to hold the task data
  const [formData, setFormData] = useState<Task>({
    _id: '',
    title: '',
    description: '',
    status: '',
    dueDate: '',
    startTime: '',
    stopTime: '',
  });

  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Extract the 'YYYY-MM-DDTHH:mm' format
  };

  const formatDateTimeForInput = (dateString: string): string => {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    return new Date(date.getTime() - offset).toISOString().slice(0, 16); // Adjust for local timezone
  };
  

  // Fetch the task details when the component mounts
  useEffect(() => {
    if (id) {
      fetchTaskDetails(id);
    }
  }, [id]);

  const fetchTaskDetails = async (taskId: string) => {
    try {
      const response = await getTask(taskId);
      setTasks(response.data);
      setFormData({
        ...response.data,
        dueDate: formatDateTimeForInput(response.data.dueDate),
      });
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };
  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTask(id, formData); // Update the task using the API
        navigate('/tasks'); // Redirect to the tasks list after successful update
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!task) {
    return <p>Loading task details...</p>; // Show loading text while task details are being fetched
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
