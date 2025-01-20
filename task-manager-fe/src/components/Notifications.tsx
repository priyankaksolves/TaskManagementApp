import { useEffect, useState } from "react";
import { getNotifications } from "../api";

// Define the interface for the notification object
interface Notification {
    _id: string;
    message: string;
}

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]); // Initializing as an empty array

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications(); // Fetch notifications from the backend
        // Ensure response.data is an array before setting state
        if (Array.isArray(response)) {
          setNotifications(response);
        } else {
          console.error("Expected an array of notifications, but received:", response);
          setNotifications([]); // Set empty array if data is not in the expected format
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]); // Set empty array in case of error
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification._id}>
              <p>{notification.message}</p>
            </li>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </ul>
    </div>
  );
};

export default NotificationList;
