import React, { useState, useEffect } from 'react';
import { getUserDetails, updateUserDetails } from '../api';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await getUserDetails();
        setUser({
          name: userDetails.name || '', // Fallback to empty string
          email: userDetails.email || '', // Fallback to empty string
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = await updateUserDetails(user);
      setUser({
        name: updatedUser.name || '', // Fallback to empty string
        email: updatedUser.email || '', // Fallback to empty string
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <label>
          Name:
          <input
            name="name"
            value={user.name || ''} // Fallback to empty string
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            name="email"
            value={user.email || ''} // Fallback to empty string
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </label>
      </div>
      <div className='user-actions'>
        <button onClick={() => setIsEditing((prev) => !prev)}>
            {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && <button onClick={handleUpdate}>Save</button>}
      </div>
    </div>
  );
};

export default UserProfile;
