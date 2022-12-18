import useUser from "../../hooks/useUser";
import { PostContainer, LikeButton, UserInfo, UserName } from "./styles";
import { useState } from "react";
import Comments from "./Comments/Comments";
import Options from "./Options/Options";
// import a thumb up icon from react-icons
import { FaThumbsUp } from "react-icons/fa";
import { getIdToken } from "firebase/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useProfileStore from "../../store/store";

const Post = ({ post }) => {
  const { user } = useUser();
  const [likes, setLikes] = useState(post.likeIds ? post.likeIds : []);
  const [liked, setLiked] = useState(
    post.likeIds && user ? post.likeIds.includes(user.uid) : false
  );
  const [comments, setComments] = useState(post.comments ? post.comments : []);
  const [showPost, setShowPost] = useState(true);
  const profile = useProfileStore((state) => state.profile);

  useEffect(() => {
    setLiked(likes && user ? likes.includes(user.uid) : false);
  }, [likes, user, liked]);

  // create a function to send a put request to the backend
  const handleLike = async () => {
    const token = user && (await user.getIdToken());
    if (liked) {
      // if the post is already liked, send a put request to the backend to decrement the likes count
      const response = await fetch(
        `https://toshaare-api.onrender.com/api/posts/${post.id}/dislike`,
        {
          method: "PUT",
          headers: {
            authToken: token,
          },
        }
      );
      const data = await response.json().then((data) => {
        setLiked(false);
        setLikes(data);
      });
    } else {
      // if the post is not liked, send a put request to the backend to increment the likes count
      const response = await fetch(
        `https://toshaare-api.onrender.com/api/posts/${post.id}/like`,
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
          setLiked(true);
          setLikes(data);
        })
        .catch((err) => console.log(err));
    }
  };

  // create a function to send a comment to the backend
  const handleComment = async (comment) => {
    const token = user && (await user.getIdToken());
    const response = await fetch(
      `https://toshaare-api.onrender.com/api/posts/${post.id}/comment`,
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
      toast.success("Post deleted successfully", { autoClose: 2000 });
      const response = await fetch(
        `https://toshaare-api.onrender.com/api/posts/${post.id}`,
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
          setShowPost(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong", { autoClose: 2000 });
        });
    }
  };

  const handleDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return new Date().getTime() - new Date(date).getTime() < 60000
      ? "Just now"
      : new Date().getTime() - new Date(date).getTime() < 3600000
      ? `· ${Math.floor(
          (new Date().getTime() - new Date(date).getTime()) / 60000
        )}m`
      : new Date().getTime() - new Date(date).getTime() < 86400000
      ? `· ${Math.floor(
          (new Date().getTime() - new Date(date).getTime()) / 3600000
        )}h`
      : new Date().getTime() - new Date(date).getTime() < 604800000
      ? `· ${Math.floor(
          (new Date().getTime() - new Date(date).getTime()) / 86400000
        )}d`
      : new Date().getTime() - new Date(date).getTime() < 2419200000
      ? `· ${new Date(date).getDate()} ${monthNames[
          new Date(date).getMonth()
        ].substring(0, 3)}`
      : new Date().getTime() - new Date(date).getTime() < 29030400000
      ? `· ${new Date(date).getDate()} ${monthNames[
          new Date(date).getMonth()
        ].substring(0, 3)}`
      : `· ${new Date(date).getDate()} ${monthNames[
          new Date(date).getMonth()
        ].substring(0, 3)} ${new Date(date).getFullYear()}`;
  };

  const handleDeleteComment = async (id)  => {
    const token = user && (await user.getIdToken());
    // confirm the deletion
    const confirm = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirm) {
      fetch(`https://toshaare-api.onrender.com/api/posts/${post.id}/comment/${id}`, 
    {
      method: "DELETE",
      headers: {
        authToken: token,
        },
      }
      )
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        toast.success("Comment deleted", { autoClose: 2000 });
      }
    )
    .catch((err) => console.log(err));
    }
  }

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
              <UserInfo>
                <UserName
                  date={
                    // calculate the time difference between the current time and the post time
                    post && post.createdAt && handleDate(post.createdAt)
                  }
                  teste='teste'
                >
                  {post.user.name || "GuestUser"}
                </UserName>
                <span>@{post.user.username}</span>
              </UserInfo>
            </Link>
          </span>
          <Options post={post} handleDelete={handleDelete} />
          <p
            className="body"
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
          <Comments comments={comments} handleComment={handleComment} handleDelete={handleDeleteComment}/>
        </div>
      )}
    </PostContainer>
  );
};

export default Post;
