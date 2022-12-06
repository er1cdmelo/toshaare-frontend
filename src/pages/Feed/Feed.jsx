import { useEffect, useState } from "react";
import { Container } from "./styles";
import useUser from "../../hooks/useUser";
import Post from "../../components/Post/Post";
import AddPost from "../../components/Post/AddPost/AddPost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getIdToken } from "firebase/auth";
import useProfileStore from "../../store/store";
import { CgSearchLoading } from "react-icons/cg";
import NoData from "../../assets/no-data.svg";

const Feed = () => {
  const setProfile = useProfileStore((state) => state.setProfile);
  const profile = useProfileStore((state) => state.profile);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const rootURL = process.env.REACT_APP_SERVER_URL
    ? 'https://toshaare-api.onrender.com/'
    : 'http://localhost:8000';

  useEffect(() => {

    const loadFeed = async () => {
      const token = user && (await user.getIdToken());
      console.log('carregando...')
      const response = await fetch(`https://toshaare-api.onrender.com/api/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: token,
        },
      });
      const data = await response.json();
      setPosts(data.reverse());
      setLoading(false);
      console.log(data)
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
    if (posts) {
      console.log(posts)
    }
  }, [posts]);

  useEffect(() => {
    if (user) {
      const loadUser = async () => {
        const token = user && (await user.getIdToken());
        fetch(`https://toshaare-api.onrender.com/api/users/${user.uid}`, {
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
            setLoading(false);
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
      {!loading ?
        (<>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div className="no-posts">
            <img src={NoData} alt="No posts" />
            <h1>No posts yet...</h1>
          </div>
          )}
        </>) :
        (
          <div className="loading">
            <CgSearchLoading />
            <h2>
              Loading posts...
            </h2>
          </div>
        )}
    </Container>
  );
};

export default Feed;
