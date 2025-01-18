// Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext/AuthContext';

const Header: React.FC = () => {

  const { isLoggedIn, logout } = useAuth();
  console.log('isLoggedIn', isLoggedIn);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect after logout
  };


  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          {isLoggedIn && (<>
            <li style={styles.menuItem}>
            <Link to="/tasks">Task List</Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/create-task">Create Task</Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/user-profile">User Profile</Link>
          </li>
          <li style={styles.menuItem}>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </button>
            </li>
          </>)}

          {!isLoggedIn && (
          <>
            <li style={styles.menuItem}>
              {/* <button onClick={login}>Login</button> */}
              <a href="/login">Login</a>
              </li>

            <li style={styles.menuItem}>
              <a href="/signup">Signup</a>
            </li>
          </>
        )}
        
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  navbar: {
    background: '#333',
    color: 'white',
    padding: '10px 20px',
  },
  menu: {
    display: 'flex',
    listStyle: 'none',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  menuItem: {
    fontSize: '1rem',
  },
  // logoutButton: {
  //   background: 'transparent',
  //   color: 'white',
  //   border: 'none',
  //   cursor: 'pointer',
  //   textDecoration: 'underline',
  // },
};

export default Header;
