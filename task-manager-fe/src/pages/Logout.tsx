import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session-related data (e.g., JWT or other session info)
        localStorage.removeItem('token'); // Remove JWT token or any session info stored locally
        sessionStorage.clear(); // Clear session storage, if applicable

        // Redirect to login page
        navigate('/login');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
