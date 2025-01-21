import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/FriendsPage.module.css";
import { getFriends } from "../api";

interface User {
  _id: string;
  name: string;
}

const FriendsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);


  const myUserId = "myUserId"; // Replace with the logged-in user's ID

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/allusers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Fetch friends for the current user
    const fetchFriends = async () => {
        setLoading(true);
        try {
          const myUserId = localStorage.getItem('userId') || ''; // Fetch user ID from localStorage
          const friendsData = await getFriends(myUserId);
          setFriends(friendsData);
        } catch (err) {
            console.log(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchFriends();

    fetchUsers();
    fetchFriends();
  }, []);


  if (loading) return <p>Loading friends...</p>;

  const handleAddFriend = async (friendId: string) => {
    try {
      await axios.post("/api/friends", { myUserId, friendId });
      // Update friends list after adding
      const addedFriend = users.find((user) => user._id === friendId);
      if (addedFriend) setFriends((prev) => [...prev, addedFriend]);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <h2>All Users</h2>
        <ul className={styles.list}>
          {users.map((user) => (
            <li key={user._id} className={styles.item}>
              <span>{user.name}</span>
              <button
                className={styles.addButton}
                onClick={() => handleAddFriend(user._id)}
                disabled={friends.some((friend) => friend._id === user._id)}
              >
                {friends.some((friend) => friend._id === user._id) ? "Added" : "Add"}
              </button>
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
                <span>{friend.name}</span>
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
