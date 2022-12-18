import { useState } from "react";
// import a options icon from react-icons
import { FaEllipsisH } from "react-icons/fa";
import { OptionsButton, OptionsContainer } from "./styles";
import useUser from "../../../hooks/useUser";
import { useEffect } from "react";

const Options = ({ post, handleDelete }) => {
  const { user } = useUser();
  const [showOptions, setShowOptions] = useState(false);
  const [canEdit, setCanEdit] = useState(
    user && post.user.uid === user.uid ? true : false
  );

  useEffect(() => {
    setCanEdit(user && post.user.uid === user.uid ? true : false);
    }, [user]);

  return (
    <>
      <OptionsButton
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        <FaEllipsisH />
      </OptionsButton>
      {showOptions && (
        <OptionsContainer>
          {canEdit && (
            <>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </OptionsContainer>
      )}
    </>
  );
};

export default Options;
