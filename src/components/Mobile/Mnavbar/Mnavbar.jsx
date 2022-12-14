// import icons for home, search, notifications and friends from react-icons
import { FaHome, FaSearch, FaRegBell } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import { NavbarContainer } from "./styles";
import useProfileStore from "../../../store/store";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Notifications from "../../Navbar/Notifications/Notifications";
import Friends from "../../Navbar/Friends/Friends";

const Navbar = () => {
  const location = useLocation();
  const { profile } = useProfileStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [newNotif, setNewNotif] = useState([]);
  const [showFriends, setShowFriends] = useState(false);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (ref.current.className.includes("friendsContainer")) {
            setShowFriends(false);
          } else if (ref.current.className.includes("notifContainer")) {
            setShowNotifications(false);
          }
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
  function useOutsideAlerterr(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (ref.current.className.includes("friendsContainer")) {
            setShowFriends(false);
          } else if (ref.current.className.includes("notifContainer")) {
            setShowNotifications(false);
          }
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
  const wrapperReff = useRef(null);
  useOutsideAlerter(wrapperRef);
  useOutsideAlerterr(wrapperReff);

  useEffect(() => {
    if (profile) {
      setNewNotif(profile.notifications.filter((n) => !n.read).length > 0 ? true : false);
    }
  }, [profile])

  return (
    <NavbarContainer>
      <div className="left">
        <Link to="/">
          <FaHome className={location.pathname === "/" && "active"} />
        </Link>
        <Link to="/search">
          <FaSearch />
        </Link>
      </div>
      <div
        className={
          location.pathname.startsWith("/profile")
            ? "profile active"
            : "profile"
        }
      >
        <Link to={`/profile/${profile && profile.username}`}>
          <img src={profile && profile.picture} alt="profile" />
        </Link>
      </div>
      <div className="right">
        <div className="notifContainer" ref={wrapperReff}>
          {showNotifications && (
            <>
              <Notifications className="notifications" />
              <div className="indicator-not"></div>
            </>
          )} 
          <div
            className={`bell-btn ${newNotif ? "new-notif" : ""}`}
          >
            <FaRegBell
              className="bell"
              onClick={() => {
                setShowNotifications(!showNotifications)
                setNewNotif(false)
              }}
            ></FaRegBell>
          </div>
        </div>

        <div className="friendsContainer" ref={wrapperRef}>
          {showFriends && (
            <>
              <Friends />
              <div className="indicator-fri"></div>
            </>
          )}
          <RiGroupLine onClick={() => setShowFriends(!showFriends)} />
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
