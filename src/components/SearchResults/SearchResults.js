import React from "react";
import styles from "./SearchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ tracks }) {
  return (
    <div className={styles.searchResults}>
      <h2>Results</h2>
      <Tracklist tracks={tracks} />
    </div>
  );
}

export default SearchResults;
