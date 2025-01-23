import React, { useEffect, useState } from "react";
import styles from "../styles/FriendsPage.module.css";
import { fetchUsers, getFriends, addFriend, removeFriend, getTasksByUserId } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface User {
  _id: string;
  username: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

const FriendsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [selectedFriendTasks, setSelectedFriendTasks] = useState<Task[]>([]);
  const [selectedFriendName, setSelectedFriendName] = useState<string>(""); // Added state for friend's username
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const myUserId = localStorage.getItem("userId") || "";

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const usersData = await fetchUsers();
        setUsers(usersData);

        const friendsData = await getFriends();
        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [myUserId]);

  const handleAddFriend = async (friendId: string) => {
    try {
      await addFriend(friendId);
      const addedFriend = users.find((user) => user._id === friendId);
      if (addedFriend) setFriends((prev) => [...prev, addedFriend]);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await removeFriend(friendId);
      setFriends((prev) => prev.filter((friend) => friend._id !== friendId));
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const fetchFriendTasks = async (friendId: string, friendName: string) => {
    try {
      const tasks = await getTasksByUserId(friendId);
      setSelectedFriendTasks(tasks);
      setSelectedFriendName(friendName); // Set the selected friend's username
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching friend's tasks:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFriendTasks([]);
    setSelectedFriendName(""); // Reset the selected friend's username
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <h2>All Users</h2>
        <ul className={styles.list}>
          {users.map((user) => (
            <li key={user._id} className={styles.item}>
              <span>{user.username}</span>
              {friends.some((friend) => friend._id === user._id) ? (
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFriend(user._id)}
                >
                  Remove Friend
                </button>
              ) : (
                <button
                  className={styles.addButton}
                  onClick={() => handleAddFriend(user._id)}
                >
                  Add Friend
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.listContainer}>
        <h2>My Friends</h2>
        <ul className={styles.list}>
          {friends.length > 0 ? (
            friends.map((friend) => (
              <li key={friend._id} className={styles.item}>
                <span
                  onClick={() => fetchFriendTasks(friend._id, friend.username)} // Pass the friend's username
                  className={styles.clickable}
                >
                  {friend.username}
                </span>
                <button
                  className={styles.iconButton}
                  onClick={() => handleRemoveFriend(friend._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))
          ) : (
            <p>No friends added yet.</p>
          )}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Tasks of {selectedFriendName}</h3> {/* Display the friend's username */}
            <ul className="task-list">
              {selectedFriendTasks.length > 0 ? (
                selectedFriendTasks.map((task) => (
                  <li key={task._id}>
                    <p>Title: {task.title}</p>
                    <p>Description: {task.description}</p>
                    <p>Status: {task.status}</p>
                    <p>Due Date: {new Date(task.dueDate).toLocaleString()}</p>
                  </li>
                ))
              ) : (
                <p>No tasks found for {selectedFriendName}.</p>
              )}
            </ul>

            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
