import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/tasks'; // Adjust as per your backend URL


export const signup = async (userData: { username: string; email: string; password: string }) => {
  return await axios.post(`${API_BASE_URL}/signup`, userData);
};

export const login = async (userData: { email: string; password: string }) => {
  return await axios.post(`http://localhost:3000/login`, userData);
};

// Fetch all tasks
export const getTasks = async () => {
  return await axios.get(API_BASE_URL);
};


// Fetch a task by ID
export const getTask = async (id: string) => {
    return await axios.get(`${API_BASE_URL}/${id}`);
};

// Delete a task by ID
export const deleteTask = async (id: string) => {
  return await axios.delete(`${API_BASE_URL}/${id}`);
};

// Create a new task
export const createTask = async (task: { title: string; description: string; status: string; dueDate: string }) => {
  return await axios.post(API_BASE_URL, task);
};

// Update an existing task by ID
export const updateTask = async (id: string, task: { title: string; description: string; status: string; dueDate: string }) => {
  return await axios.put(`${API_BASE_URL}/${id}`, task);
};
