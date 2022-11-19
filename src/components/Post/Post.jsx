import useUser from "../../hooks/useUser";
import { PostContainer, LikeButton } from "./styles";
import { useState } from "react";
import Comments from "./Comments/Comments";
import Options from "./Options/Options";
// import a thumb up icon from react-icons
import { FaThumbsUp } from "react-icons/fa";
import { getIdToken } from "firebase/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const { user } = useUser();
  const [likes, setLikes] = useState(post.likeIds ? post.likeIds : []);
  const [liked, setLiked] = useState(
    post.likeIds && user ? post.likeIds.includes(user.uid) : false
  );
  const [comments, setComments] = useState(post.comments ? post.comments : []);
  const [showPost, setShowPost] = useState(true);

  useEffect(() => {
    setLiked(likes && user ? likes.includes(user.uid) : false);
  }, [likes, user, liked]);

  // create a function to send a put request to the backend
  const handleLike = async () => {
    const token = user && (await user.getIdToken());
    if (liked) {
      // if the post is already liked, send a put request to the backend to decrement the likes count
      const response = await fetch(
        `http://localhost:8000/api/posts/${post.id}/dislike`,
        {
          method: "PUT",
          headers: {
            authToken: token,
          },
        }
      );
      const data = await response.json().then((data) => {
        console.log(data);
        setLiked(false);
        setLikes(data);
        console.log("disliked");
      });
    } else {
      // if the post is not liked, send a put request to the backend to increment the likes count
      const response = await fetch(
        `http://localhost:8000/api/posts/${post.id}/like`,
        {
          method: "PUT",
          headers: {
            authToken: token,
          },
        }
      );
      const data = await response
        .json()
        .then((data) => {
          console.log(data);
          setLiked(true);
          setLikes(data);
          console.log("liked");
        })
        .catch((err) => console.log(err));
    }
  };

  // create a function to send a comment to the backend
  const handleComment = async (comment) => {
    const token = user && (await user.getIdToken());
    console.log(comment);
    const response = await fetch(
      `http://localhost:8000/api/posts/${post.id}/comment`,
      {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authToken: token,
        },
      }
    );
    const data = await response
      .json()
      .then((data) => {
        setComments(data);
      })
      .catch((err) => console.log(err));
  };

  // create a function to delete a post
  const handleDelete = async () => {
    // create a alert to confirm the deletion
    const token = user && (await user.getIdToken());
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirm) {
      console.log(token);
      toast.success("Post deleted successfully", { autoClose: 2000 });
      const response = await fetch(
        `http://localhost:8000/api/posts/${post.id}`,
        {
          method: "DELETE",
          headers: {
            authToken: token,
          },
        }
      );
      const data = await response
        .json()
        .then((data) => {
          console.log(data);
          setShowPost(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong", { autoClose: 2000 });
        });
    }
  };

  return (
    <PostContainer show={showPost}>
      {post && (
        <div className="wrapper">
          <span className="user">
            <Link to={`/profile/${post.user.username}`}>
              <img
                src={
                  post.user.profilePicture ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
                alt="avatar"
                loading="lazy"
              />
              <span className="name-user">
                <h3>{post.user.name || "GuestUser"}</h3>
                <span>@{post.user.username}</span>
              </span>
            </Link>
          </span>
          <Options post={post} handleDelete={handleDelete} />
          <p
            className="body"
            onClick={() => {
              console.log("liked: ", liked);
            }}
          >
            {post.body}
          </p>
          <span className="likesCount">
            <FaThumbsUp />
            <span>{likes.length}</span>
          </span>
          <div className="interact">
            <LikeButton
              liked={liked}
              className="like"
              onClick={() => handleLike()}
            >
              Like
            </LikeButton>
          </div>
          <Comments comments={comments} handleComment={handleComment} />
        </div>
      )}
    </PostContainer>
  );
};

export default Post;
