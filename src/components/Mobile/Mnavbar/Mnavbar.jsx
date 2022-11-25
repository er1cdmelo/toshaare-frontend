// import icons for home, search, notifications and friends from react-icons
import { FaHome, FaSearch, FaRegBell } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import { NavbarContainer } from "./styles";
import useProfileStore from "../../../store/store";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import Notifications from "../../Navbar/Notifications/Notifications";

const Navbar = () => {
  const location = useLocation();
  const { profile } = useProfileStore();
  const [showNotifications, setShowNotifications] = useState(false);

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
        {showNotifications && (
          <>
            <Notifications />
            <div className="indicator-not"></div>
          </>
        )}
        <FaRegBell
          onClick={() => setShowNotifications(!showNotifications)}
        ></FaRegBell>
        <RiGroupLine />
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
