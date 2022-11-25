import { NotificationsContainer } from "./styles"
import useProfileStore from "../../../store/store"
import { useState, useEffect } from "react"
import { getIdToken } from "firebase/auth"
import useUser from "../../../hooks/useUser"

const Notifications = () => {
  const profile = useProfileStore((state) => state.profile)
  const [notifications, setNotifications] = useState([])
  const { user } = useUser()

  useEffect(() => {
    if (profile) {
      setNotifications(profile.notifications || [])
      console.log(profile.notifications)
    }
  }, [profile])

  useEffect(() => {
    // on notification click, set all notifications to read
    const handleNotificationClick = async () => {
    if (profile) {
      const token = user && (await user.getIdToken())
      fetch(`/api/users/${user.uid}/notifications`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authToken: profile.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
        .catch((err) => console.log(err))
    }
  }

  handleNotificationClick()
  }, [notifications])

  console.log('Notifications bar appeared')

  return (
    <NotificationsContainer className="notif">
      <h1>Notifications</h1>
      {notifications.length ? (
        <ul>
          {notifications.map((notification) => (
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
  )
}

export default Notifications