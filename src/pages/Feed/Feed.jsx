import { useEffect, useState } from "react";
import { Container } from "./styles";
import useUser from "../../hooks/useUser";
import Post from "../../components/Post/Post";
import AddPost from "../../components/Post/AddPost/AddPost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getIdToken } from "firebase/auth";
import useProfileStore from "../../store/store";

const Feed = () => {
  const setProfile = useProfileStore((state) => state.setProfile);
  const profile = useProfileStore((state) => state.profile);
  const [posts, setPosts] = useState([]);
  const { user, loading } = useUser();
  const rootURL = process.env.REACT_APP_SERVER_URL
    ? process.env.REACT_APP_SERVER_URL
    : 'http://localhost:8000';

  useEffect(() => {

    const loadFeed = async () => {
      const token = user && (await user.getIdToken());
      const response = await fetch(`/api/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: token,
        },
      });
      const data = await response.json();
      setPosts(data.reverse());
    };
    if (!user) {
      return;
    }
    loadFeed();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // create a function that will add a new post to the posts array, and then set the posts state to the new array
  const newPost = (post) => {
    setPosts([post, ...posts ]);
  };

  useEffect(() => {
    if (user) {
      const loadUser = async () => {
        const token = user && (await user.getIdToken());
        fetch(`http://localhost:8000/api/users/${user.uid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: token,
            reqm: "uid"
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setProfile(data);
          })
          .catch((err) => console.log(err));
      };
      loadUser();
    }
  }, [user, posts]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <ToastContainer />
      <AddPost add={newPost} />
      {posts &&
        posts.map((post) => <Post key={post.id} post={post} />)}
    </Container>
  );
};

export default Feed;
