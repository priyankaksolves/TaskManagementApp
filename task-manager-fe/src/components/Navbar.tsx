import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav>
    <Link to="/">Task List</Link> | <Link to="/add-task">Add Task</Link>
  </nav>
);

export default Navbar;
