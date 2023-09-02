import { Nav } from "./styles";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useProfileStore from "../../store/store";
import { useEffect, useState, useRef } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import Notifications from "./Notifications/Notifications";
import SearchResults from "./Search/SearchResults";
import Logo from '../../assets/dark-logo.png'

const Navbar = () => {
  const { user } = useUser();
  const profile = useProfileStore((state) => state.profile);
  const photoURL =
    profile && profile.picture
      ? profile.picture
      : user?.photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [newNotif, setNewNotif] = useState([]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSearch(false);
          setText("")
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);


  useEffect(() => {
    if (profile && profile.notifications) {
      setNewNotif(profile.notifications.filter((notif) => !notif.read).length > 0); 
    }
  }, [profile]);

  return (
    <Nav>
      <Link to="/" className="logo">
        <img src={Logo} alt="logo" />
        <h1>ToShaare</h1>
      </Link>
      {user && profile && (
        <div className="user-info">
          <div className="search" ref={wrapperRef}>
            {showSearch ? (
              <>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setText(e.target.value)}
                />
                {text && <SearchResults text={text} />}
              </>
            ) : (
              <button
                className="btn search-btn"
                onClick={() => setShowSearch(true)}
              >
                <FaSearch />
              </button>
            )}
          </div>
          <button
            className={
              `notifications-btn btn ${newNotif ? "new-notif" : ""}`
            }
            onClick={() => {
              setShowNotifications(!showNotifications)
              setNewNotif(false)
            }}
          >
            <FaBell />
          </button>
          {showNotifications && <Notifications />}
          <Link to={`/profile/${profile.username}`}>
            <img src={photoURL} alt="user" />
          </Link>
        </div>
      )}
    </Nav>
  );
};

export default Navbar;
