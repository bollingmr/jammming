import React from "react";
import Track from "../Track/Track";
import styles from "./Tracklist.module.css";

function Tracklist({ tracks, onAdd, onRemove, showAddButton }) {
  return (
    <div className={styles.tracklist}>
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          onRemove={onRemove}
          showAddButton={showAddButton}
        />
      ))}
    </div>
  );
}

export default Tracklist;
