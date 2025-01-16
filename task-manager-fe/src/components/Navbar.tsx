import React from 'react';
import { Link } from 'react-router-dom';

// const Navbar: React.FC = () => (
//   <nav>
//     <Link to="/">Task List</Link> | <Link to="/add-task">Add Task</Link>
//   </nav>
// );

const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: '10px', background: '#f4f4f4', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/login" style={{ marginRight: '10px' }}>
          Login
        </Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
