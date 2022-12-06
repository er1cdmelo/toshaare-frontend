import { Container } from "./styles"
import useProfileStore from "../../../store/store"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Friends = () => {
  const [friends, setFriends] = useState([])
  const profile = useProfileStore(state => state.profile)

  useEffect(() => {
    if (profile) {
      setFriends(profile.friends)
    }
  }, [])

  useEffect(() => {
    if (friends && profile) {
      // fetch all user's friends to check if the friend has the user as a friend
      friends.forEach(friend => {
        fetch(`http://localhost:3001/profile/${friend.username}`)
          .then(res => res.json())
          .then(data => {
            // if the user is not a friend of the friend, remove the friend
            if (!data.friends.find(f => f.uid === profile.uid)) {
              const newFriends = friends.filter(f => f.username !== friend.username)
              setFriends(newFriends)
            }
          })
      })
    }
  }, [friends])

  return (
    <Container className="friends">
        <h1>Friends</h1>
        <ul>
            {friends ?
                friends.map(friend => (
                    <Link to={`/profile/${friend.username}`} key={friend.uid}>
                      <li key={friend.id}>
                        <img src={friend.picture} alt={friend.name} />
                        <span>{friend.name}</span>
                    </li>
                    </Link>
                ))
            : <p>No friends...</p>}
        </ul>
    </Container>
  )
}

export default Friends