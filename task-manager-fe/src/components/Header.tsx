// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../pages/Logout';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/tasks">Task List</Link>
          </li>
          <li>
            <Link to="/create-task">Create Task</Link>
          </li>
          <li>
          <LogoutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
