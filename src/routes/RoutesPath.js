import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import SignIn from "../pages/Sign/SignIn/SignIn";
import SignUp from "../pages/Sign/SignUp/SignUp";
import Feed from "../pages/Feed/Feed";
import Profile from "../pages/Profile/Profile";

const routes = () => {
  return (
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route  path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Feed />} />
        </Route>
        <Route  path="/" element={<PrivateRoutes />}>
          <Route path="/profile/:usersearch" element={<Profile />} />
        </Route>
        <Route  path="/" element={<PrivateRoutes />}>
          <Route path="/profile/" element={<Profile />} />
        </Route>
      </Routes>
  );
};

export default routes;