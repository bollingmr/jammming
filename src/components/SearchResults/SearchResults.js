import React from "react";
import styles from "./SearchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ tracks, onAdd }) {
  return (
    <div className={styles.searchResults}>
      <h2>Search Results</h2>
      <Tracklist
        tracks={tracks}
        onAdd={onAdd}
        showAddButton={true}
      />
    </div>
  );
}

export default SearchResults;
