import { NotificationsContainer } from "./styles"
import useProfileStore from "../../../store/store"
import { useState, useEffect } from "react"

const Notifications = () => {
  const profile = useProfileStore((state) => state.profile)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (profile) {
      setNotifications(profile.notifications || [])
      console.log(profile.notifications)
    }
  }, [profile])

  console.log('Notifications bar appeared')

  return (
    <NotificationsContainer>
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