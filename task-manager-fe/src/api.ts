import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/tasks'; // Adjust as per your backend URL
const AUTH_API_BASE_URL = 'http://localhost:3000/api/auth';
const USER_API_URL = 'http://localhost:3000/api/users/me';


// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper to set the authorization headers
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// Authentication APIs
export const signup = async (userData: { username: string; email: string; password: string }) => {
  return await axios.post(`${AUTH_API_BASE_URL}/signup`, userData);
};

export const login = async (userData: { email: string; password: string }) => {
  return await axios.post(`${AUTH_API_BASE_URL}/login`, userData);
};

// Task APIs
export const getTasks = async () => {
  return await axios.get(API_BASE_URL, authHeaders());
};

export const getTask = async (id: string) => {
  return await axios.get(`${API_BASE_URL}/${id}`, authHeaders());
};

export const deleteTask = async (id: string) => {
  return await axios.delete(`${API_BASE_URL}/${id}`, authHeaders());
};

export const createTask = async (task: { title: string; description: string; status: string; dueDate: string }) => {
  return await axios.post(API_BASE_URL, task, authHeaders());
};

export const updateTask = async (
  id: string,
  task: { title: string; description: string; status: string; dueDate: string }
) => {
  return await axios.put(`${API_BASE_URL}/${id}`, task, authHeaders());
};


export const getUserDetails = async () => {
  const response = await axios.get(USER_API_URL, authHeaders());
  return response.data;
};

export const updateUserDetails = async (userData: { name: string; email: string; }) => {
  const response = await axios.put(USER_API_URL, userData, authHeaders());
  return response.data;
};

