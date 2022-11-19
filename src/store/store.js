import create from "zustand";
// create a store

const useProfileStore = create((set) => ({
  profile: {
    name: "",
    username: "",
    bio: "",
    picture:"",
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
