import { Nav } from "./styles";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useProfileStore from "../../store/store";
import { useEffect, useState, useRef } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import Notifications from "./Notifications/Notifications";
import SearchResults from "./Search/SearchResults";

const Navbar = () => {
  const { user } = useUser();
  const profile = useProfileStore((state) => state.profile);
  const photoURL =
    profile && profile.picture
      ? profile.picture
      : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");

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

  return (
    <Nav>
      <Link to="/">
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
            className="notifications-btn btn"
            onClick={() => setShowNotifications(!showNotifications)}
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
