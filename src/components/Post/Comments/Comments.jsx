import { CommentsContainer, Comment, CommentForm } from "./styles";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import useProfileStore from "../../../store/store";
import Options from "../Options/Options";
import useUser from "../../../hooks/useUser";
import { getIdToken } from "firebase/auth";

const Comments = ({ postID, comments, handleComment }) => {
  const { user } = useUser();
  const profile = useProfileStore((state) => state.profile);
  const [commentsArr, setCommentsArr] = useState(comments || []);
  const [comment, setComment] = useState({ body: "", username: profile && profile.username, picture: profile && profile.picture, bName: profile && profile.name });

  const handleDelete = async (id)  => {
    const token = user && (await user.getIdToken());
    fetch(`http://localhost:8000/api/posts/${postID}/comment/${id}`, 
    {
      method: "DELETE",
      headers: {
        authToken: token,
        },
      }
      )
      .then((res) => res.json())
      .then((data) => {
        setCommentsArr(data);
      }
    )
    .catch((err) => console.log(err));
  }

  return (
    <CommentsContainer>
      <CommentForm>
        <input
          type="text"
          placeholder="Write a comment..."
          onChange={(e) => {setComment({ ...comment, body: e.target.value })}}
          value={comment ? comment.body : ""}
        />
        <button onClick={() => {
          if(comment) {
            handleComment(comment);
            setComment("");
          }
        }}>
          <FaPaperPlane />
        </button>
      </CommentForm>
      {commentsArr.length ? (
        commentsArr.map((comment) => (
          <Comment key={comment.id}>
            <Link to={`/profile/${comment.user.username}`}>
            <img src={comment.user.profilePicture || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} alt="avatar" loading="lazy"/>
            </Link>
            <div className="comment">
              <span className="user">{comment.user.name || 'Guest'}</span>
              <span className="body">{comment.body}</span>
            </div>
            <Options post={comment} handleDelete={() => {
              handleDelete(comment.id)
              }}/>
          </Comment>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </CommentsContainer>
  );
};

export default Comments;
