import React, { useState } from "react";
import styles from "./SearchResults.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ tracks, onAdd, onSearch }) {
  const [showMore, setShowMore] = useState(false);
  const visibleTracks = showMore ? tracks : tracks.slice(0, 5);
  return (
    <div className={styles.searchResults}>
      <SearchBar onSearch={onSearch} />
      {tracks.length === 0 && (
        <div className={styles.noResults}>Search results will appear here</div>
      )}
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
