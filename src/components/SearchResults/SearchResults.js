import React, { useState } from "react";
import styles from "./SearchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ tracks, onAdd }) {
  const [showMore, setShowMore] = useState(false);
  const visibleTracks = showMore ? tracks : tracks.slice(0, 5);
  return (
    <div className={styles.searchResults}>
      <h2>Search Results</h2>
      <Tracklist
        tracks={visibleTracks}
        onAdd={onAdd}
        showAddButton={true}
      />
      {tracks.length > 5 && (
        <button
          className={styles.showMore}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export default SearchResults;
