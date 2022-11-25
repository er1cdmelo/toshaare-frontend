import create from "zustand";
// create a store

const useProfileStore = create((set) => ({
  profile: {
    name: "Guest",
    username: "guestuser",
    bio: "",
    picture:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    email: "",
  },
  setProfile: (profileSet) => {
    set((state) => ({
      profile: {
        ...state.profile,
        ...profileSet,
      },
    }));
  },
}));

export default useProfileStore;
