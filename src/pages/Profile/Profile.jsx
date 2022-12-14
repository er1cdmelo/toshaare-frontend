import { Container, FriendsContainer, PostsContainer } from "./styles";
import { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import EditProfile from "./EditProfile/EditProfile";
import {
  getAuth,
  signOut,
  sendEmailVerification,
  getIdToken,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaSignOutAlt,
  FaEdit,
  FaHeart,
  FaUserPlus,
  FaHeartBroken,
  FaUserMinus,
} from "react-icons/fa";
import useProfileStore from "../../store/store";
import Post from "../../components/Post/Post";
import NoData from "../../assets/no-data.svg";
import NoFriends from "../../assets/no-friends.svg";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { usersearch } = useParams();

  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);
  const [thisProfile, setThisProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [owner, setOwner] = useState(false);

  const auth = getAuth();

  const updateMyProfile = async () => {
    const token = user && (await user.getIdToken());
    fetch(`https://toshaare-api.onrender.com/api/users/${user.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: token,
        reqm: "uid",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  };

  useEffect(() => {
    if (usersearch && user) {
      const loadUser = async () => {
        const token = user && (await user.getIdToken());
        fetch(`https://toshaare-api.onrender.com/api/users/${usersearch}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: token,
            reqm: "username",
          },
        })
          .then(async (res) => await res.json())
          .then((data) => {
            setThisProfile(data);
            setOwner(data.uid === user.uid);
            setPosts(data.posts);
            // create a loop in user friends array and fetch the user data for each friend checking if the friend has user in his friends array
            // if the friend has user in his friends array, then add the friend to the friends array
            setFriends(data.friends);
          })
          .catch((err) => console.log(err));
      };
      setTimeout(() => {
        loadUser();
      }, 1000);
    } else {
      setThisProfile(profile);
      setPosts(profile.posts);
      setFriends(profile.friends);
      setOwner(true);
    }
  }, [profile, user, usersearch]);

  useEffect(() => {
    
    if (user && friends.length) {
      friends.forEach((friend) => {
        if (friend.friends.find((f) => f.uid === thisProfile.uid)) {
          // if friends array hasn't this friends, so insert
          if (!friends.find((fr) => fr.uid === friend.uid)) {
            setFriends(...friends, friend);
          }
        }
      });
    }
  }, [friends, thisProfile]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Logged out successfully!", { autoClose: 1000 });
        navigate("/signin");
        setProfile({
          name: "Guest",
          username: "guestuser",
          bio: "",
          picture:
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
          email: "",
        });
      })
      .catch((error) => {
        // An error happened.
        toast.error("ERROR: " + error.message);
      });
  };

  const sendVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        toast.success("Verification email sent! Check your mail box and spam", {
          autoClose: 5000,
        });
        // ...
      })
      .catch((error) => {
        // An error happened.
        toast.error("ERROR: " + error.message);
      });
  };

  const sendFriendRequest = async () => {
    const token = user && (await user.getIdToken());
    fetch(`https://toshaare-api.onrender.com/api/users/${user.uid}/friends`, {
      method: "PUT",
      body: JSON.stringify({ friendId: thisProfile.uid }),
      headers: {
        "Content-Type": "application/json",
        authToken: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Friend added!", { autoClose: 1000 });
        updateMyProfile();
      })
      .catch((err) => console.log(err));
  };

  const unfriend = async () => {
    const token = user && (await user.getIdToken());
    window.confirm("Are you sure you want to unfriend this user?") &&
      fetch(`https://toshaare-api.onrender.com/api/users/${user.uid}/friends`, {
        method: "DELETE",
        body: JSON.stringify({ friendId: thisProfile.uid }),
        headers: {
          "Content-Type": "application/json",
          authToken: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("You removed this user from your friends!", {
            autoClose: 1000,
          });
          updateMyProfile();
        })
        .catch((err) => console.log(err));
  };

  return (
    <>
      {thisProfile && user ? (
        <>
          {showModal && <EditProfile closeModal={() => setShowModal(false)} />}
          <Container className="master-container" show={showModal}>
            <div className="user-info">
              <img
                src={
                  thisProfile.picture ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
                alt={thisProfile.name}
              />
              <h2>{thisProfile.name}</h2>
              <span>@{thisProfile.username}</span>
              <p>{thisProfile.bio || "Hi there! I'm using ToShaare."}</p>
              {owner && (
                <div className="warnings">
                  <div className="warn">
                    {user.emailVerified ? (
                      <span className="verified">Email verified</span>
                    ) : (
                      <span className="not-verified">
                        Email not verified
                        <button onClick={sendVerification}>Verify</button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            {owner && (
              <>
                <button
                  className="btn edit-profile"
                  onClick={() => setShowModal(true)}
                >
                  <FaEdit />
                  Edit profile
                </button>
                <button className="btn logout" onClick={logout}>
                  <FaSignOutAlt />
                  Log out
                </button>
              </>
            )}
            {!owner && (
              <>
                {profile.friends &&
                profile.friends.find((f) => f.uid === thisProfile.uid) ? (
                  <button className="btn logout" onClick={unfriend}>
                    {thisProfile.friends.find((f) => f.uid === user.uid) ? (
                      <>
                        <FaHeartBroken />
                        Remove friend
                      </>
                    ) : (
                      <>
                        <FaUserMinus />
                        Cancel request
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    className="btn add-friend"
                    onClick={sendFriendRequest}
                  >
                    {thisProfile.friends.find((f) => f.uid === user.uid) ? (
                      <>
                        <FaHeart />
                        Accept request
                      </>
                    ) : (
                      <>
                        <FaUserPlus />
                        Add friend
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </Container>
          <FriendsContainer>
            <h1>Friends - {String(friends.length)}</h1>

            {friends.length ? (
              <div className="friends">
                {friends.map((friend, index) => (
                  <Link to={`/profile/${friend.username}`} key={index}>
                    <div
                      className="friendCard"
                      key={friend.uid}
                      title={friend.name}
                    >
                      <img src={friend.picture} alt={friend.name} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-data">
                <img src={NoFriends} alt="No friends" />
                <span>No friends yet</span>
              </div>
            )}
          </FriendsContainer>
          <PostsContainer>
            <h1>Posts - {String(posts.length)}</h1>
            {posts.length ? (
              posts.reverse().map((post) => <Post key={post.id} post={post} />)
            ) : (
              <div className="no-data">
                <img src={NoData} alt="No data" />
                <p>No posts yet...</p>
              </div>
            )}
          </PostsContainer>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;
