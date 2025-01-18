# Task Management App

A task management application that allows users to manage their tasks with features such as login, sign-up, and user management. The app is built with a Node.js and Express backend, MongoDB database, and a React frontend using TypeScript. 

## Features
- **User Authentication**: Sign up and log in to the app with authentication.
- **Task Management**: Add, edit, delete, and view tasks.
- **User Profile**: View and update user details.
- **Responsive UI**: A clean and user-friendly interface for managing tasks.

## Technologies Used
- **Frontend**: 
  - React with TypeScript
  - Vite (Development environment)
  - Axios (HTTP requests)
  - React Router (for routing)
- **Backend**: 
  - Node.js and Express
  - MongoDB (database)
  - JWT (JSON Web Token) for authentication
  - Bcrypt.js (password hashing)
  - Mongoose (MongoDB ODM)

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/priyankaksolves/task-management-app.git

 - cd task-management-app/backend

 - Install dependencies
  - npm install
 
 - Create a .env file in the backend directory and add your environment variables:
  - MONGODB_URI=your_mongodb_connection_string
  - JWT_SECRET=your_jwt_secret_key

 - run the backend server node index.js

### Frontend Setup
 - cd task-management-app/frontend
 - Install dependencies
 - npm install
 - Run the application
 - npm run dev
 - The frontend should now be accessible at http://localhost:3000.






