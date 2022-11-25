import { Container } from "./styles";
import { useState } from "react";
import SearchResults from "../../components/Navbar/Search/SearchResults";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <Container>
      <input
        type="text"
        value={search}
        placeholder="Type something"
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && <SearchResults text={search} className='searchResults' />}
    </Container>
  );
};

export default Search;
