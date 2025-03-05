import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { ReactComponent as SearchIcon } from "../../search.svg";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search for a song..."
        onChange={handleTermChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className={styles.searchButton}
        onClick={handleSearch}
      >
        <SearchIcon className={styles.searchIcon} />
      </button>
    </div>
  );
};

export default SearchBar;
