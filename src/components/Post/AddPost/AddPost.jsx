import useUser from "../../../hooks/useUser";
import { getIdToken } from "firebase/auth";
import { PostForm } from "./styles";
import { FaTelegramPlane } from "react-icons/fa";
import { useState } from "react";
import Loading from "../../Loading/Loading";
import { toast } from "react-toastify";
import useProfileStore from "../../../store/store";

const AddPost = ({ add }) => {
  const profile = useProfileStore((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({ body: ""});

  const { user } = useUser();

  const handleType = (e) => {
    setPost({body: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(post)
    if (post.body.length < 1) return;
    const token = user && (await user.getIdToken());
    setLoading(true);
    setPost({body: "" });
    await profile.username &&
    fetch("https://toshaare-api.onrender.com/api/posts", {
      method: "POST",
      body: JSON.stringify({...post, username: profile.username}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authToken: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Post added successfully", { autoClose: 2000 });
        console.log(data);
        add(data);
        setLoading(false);
      })
      .catch((err) =>
        toast.error("Something went wrong, please try again", {
          autoClose: 2000,
        })
      );
  };

  return (
    <PostForm>
      {user && (
        <div className="user-info">
          <img
            src={
              user.photoURL
                ? user.photoURL
                : "https://construct-static.com/images/v1027/r/uploads/tutorial/0/images/17449/windows-8-user-account_v650.jpg"
            }
            alt="user"
          />
          <h3>{user.displayName ? user.displayName : "Guest"}</h3>
        </div>
      )}
      <input
        type="message"
        placeholder="Share your post"
        onChange={(e) => handleType(e)}
      />
      <button onClick={() => handleSubmit()}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <FaTelegramPlane /> Post
          </>
        )}
      </button>
    </PostForm>
  );
};

export default AddPost;
