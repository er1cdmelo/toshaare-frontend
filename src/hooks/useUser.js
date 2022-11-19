import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";
import useProfileStore from "../store/store";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const setProfile = useProfileStore((state) => state.setProfile);
  const profile = useProfileStore((state) => state.profile);

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user && !user.displayName) {
        setProfile({
          username: "",
          name: user.displayName,
          picture: user.photoURL,
          email: user.email,
          bio: "Hey there! I am using ToShaare",
        });
      }
      // checks if user is logged in and hasn't set up profile
      if (user && !profile.username) {
        const loadUser = async () => {
            const token = user && (await user.getIdToken());
            if (user) {
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
                })
                .catch((err) => console.log(err));
            }
          };
        loadUser();
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useUser;
