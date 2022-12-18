import { NotificationsContainer } from "./styles";
import useProfileStore from "../../../store/store";
import { useState, useEffect } from "react";
import { getIdToken } from "firebase/auth";
import useUser from "../../../hooks/useUser";

const Notifications = () => {
  const profile = useProfileStore((state) => state.profile);
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (profile) {
      setNotifications(profile.notifications || []);
    }
  }, [profile]);

  useEffect(() => {
    // on notification click, set all notifications to read
    const handleNotificationClick = async () => {
      if (profile && user) {
        const token = user && (await user.getIdToken());
        fetch(`https://toshaare-api.onrender.com/api/users/${user.uid}/notifications`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            authToken: token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setNotifications(data);
          })
          .catch((err) => console.log(err));
      }
    };

    handleNotificationClick();
  }, [user]);

  return (
    <NotificationsContainer className="notif">
      <h1>Notifications</h1>
      {notifications.length ? (
        <ul>
          {notifications.reverse().map((notification) => (
            <li key={notification.id} className="notification">
              {notification.user && (
                <img src={notification.user.picture} alt="user-pic" />
              )}
              <p>{notification.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications...</p>
      )}
    </NotificationsContainer>
  );
};

export default Notifications;
