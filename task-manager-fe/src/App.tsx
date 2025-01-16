// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import Header from './components/Header';
import './assets/styles.css'; // Import the CSS file
import EditTask from './components/TaskEdit';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
        <Route path="/" element={<TaskList />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create-task" element={<TaskForm />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
