import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search for a song or artist..."
      />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;
