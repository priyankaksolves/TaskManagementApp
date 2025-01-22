import React, { useEffect, useState } from "react";
import styles from "../styles/FriendsPage.module.css";
import { fetchUsers, getFriends, addFriend, removeFriend } from "../api";

interface User {
  _id: string;
  username: string;
}

const FriendsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const myUserId = localStorage.getItem("userId") || ""; // Fetch user ID directly from localStorage

  useEffect(() => {
    // Fetch all users and friends for the current user
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch all users
        const usersData = await fetchUsers();
        setUsers(usersData);

        // Fetch user's friends
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

  // Add a friend
  const handleAddFriend = async (friendId: string) => {
    try {
      await addFriend(friendId);

      const addedFriend = users.find((user) => user._id === friendId);
      if (addedFriend) {
        setFriends((prev) => [...prev, addedFriend]);
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  // Remove a friend
  const handleRemoveFriend = async (friendId: string) => {
    try {
      await removeFriend(friendId);

      setFriends((prev) => prev.filter((friend) => friend._id !== friendId));
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {/* All Users List */}
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

      {/* Friends List */}
      <div className={styles.listContainer}>
        <h2>My Friends</h2>
        <ul className={styles.list}>
          {friends.length > 0 ? (
            friends.map((friend) => (
              <li key={friend._id} className={styles.item}>
                <span>{friend.username}</span>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFriend(friend._id)}
                >
                  Remove
                </button>
              </li>
            ))
          ) : (
            <p>No friends added yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FriendsPage;
