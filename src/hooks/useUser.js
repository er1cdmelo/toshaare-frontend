import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
                    photoURL: user.photoURL,
                    email: user.email,
                    bio: "Hey there! I am using ToShaare",
                });
            }
        });
        return () => unsubscribe();
    }, []);

    return { user, loading };
};

export default useUser;