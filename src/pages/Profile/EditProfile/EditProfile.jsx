import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, updateProfile, getIdToken } from "firebase/auth";
import useUser from "../../../hooks/useUser";
// import a close icon from react-icons
import { FaTimes } from "react-icons/fa";
// import a upload icon from react-icons
import { FaUpload } from "react-icons/fa";
// import a save icon from react-icons
import { FaSave } from "react-icons/fa";

import useProfileStore from "../../../store/store";

import { Container, ModalContainer } from "./styles";

const EditProfile = ({ closeModal }) => {
  const profile = useProfileStore((state) => state.profile);
  const [name, setName] = useState(profile ? profile.name : "");
  const [photoURL, setPhotoURL] = useState(profile ? profile.picture : "");
  const [bio, setBio] = useState(profile ? profile.bio : "");
  const { user } = useUser();
  const navigate = useNavigate();
  const auth = getAuth();


  const setProfile = useProfileStore((state) => state.setProfile);

  const patchProfile = async () => {
    const token = user && (await user.getIdToken());
    const response = await fetch(`https://toshaare-api.onrender.com/api/users/${user.uid}`, {
      method: "POST",
      body: JSON.stringify({
        name: name || profile.name,
        bio: bio || profile.bio,
        picture: photoURL || profile.picture,
      }),
      headers: {
        "Content-Type": "application/json",
        authToken: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleEditProfile = () => { 
    updateProfile(auth.currentUser, {
      displayName: name ? name : user.displayName,
      photoURL: photoURL ? photoURL : user.photoURL,
      bio: bio ? bio : user.bio,
    })
      .then(() => {
        // Update successful.
        toast.success("Profile updated successfully!", { autoClose: 1000 });
        setProfile({
          ...profile,
          name: name ? name : user.displayName,
          picture: photoURL ? photoURL : user.photoURL,
          bio: bio ? bio : profile.bio,
        });
        patchProfile();
        closeModal();
        navigate("/profile");
      })
      .catch((error) => {
        // An error occurred.
        toast.error("ERROR: " + error.message);
      });
  };

  // create a function to handle the input file
  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ModalContainer>
      <Container>
        <button className="closeBtn" onClick={closeModal}>
          <FaTimes />
        </button>
        <h1>Edit profile</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="bio">Bio</label>
        <textarea
          type="text"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <label htmlFor="photoURL">Photo URL</label>
        <input
          type="text"
          id="photoURL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <img src={photoURL} alt="profile" />
        <button className="btn edit-profile" onClick={handleEditProfile}>
          <FaSave />
          Save
        </button>
      </Container>
    </ModalContainer>
  );
};

export default EditProfile;
