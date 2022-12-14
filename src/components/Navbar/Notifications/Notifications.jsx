import { NotificationsContainer } from "./styles";
import useProfileStore from "../../../store/store";
import { useState, useEffect } from "react";
import { getIdToken } from "firebase/auth";
import useUser from "../../../hooks/useUser";

const Notifications = () => {
  const profile = useProfileStore((state) => state.profile);
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();
  console.log(user)

  useEffect(() => {
    if (profile) {
      setNotifications(profile.notifications || []);
      console.log(profile.notifications);
    }
  }, [profile]);

  useEffect(() => {
    // on notification click, set all notifications to read
    const handleNotificationClick = async () => {
      console.log("handleNotificationClick");
      console.log("profile", profile);
      console.log("user", user);
      if (profile && user) {
        console.log("indo...");
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
            console.log("SIM!!!!!!");
            setNotifications(data);
          })
          .catch((err) => console.log(err));
      }
    };

    handleNotificationClick();
  }, [user]);

  console.log("Notifications bar appeared");

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
