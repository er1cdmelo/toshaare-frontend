import { SearchContainer } from "./styles";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ text }) => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://toshaare-api.onrender.com/api/users");
      const data = await res.json();
      setAllUsers(data);
    };
    if (!allUsers.length) fetchUsers();
  }, [text]);

  return (
    <SearchContainer>
      <ul>
        {allUsers.length &&
          text.length > 2 &&
          allUsers
            .filter((user) =>
              user.username.toLowerCase().includes(text.toLowerCase())
            )
            .map((user) => (
              <Link to={`/profile/${user.username}`}>
                <li key={user.id}>
                  <img src={user.picture} alt="user-pic" />
                  <p>{user.username}</p>
                </li>
              </Link>
            ))}
      </ul>
    </SearchContainer>
  );
};

export default SearchResults;
