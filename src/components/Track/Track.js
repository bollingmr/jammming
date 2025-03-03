import React from "react";
import styles from "./Track.module.css";

function Track({ track, onAdd, onRemove, showAddButton }) {
  return (
    <div className={styles.track}>
      <div className={styles.albumArt}>
        {track.albumArt ? (
          <img
            src={track.albumArt}
            alt="Album Art"
          />
        ) : (
          <div className={styles.noAlbumArt}>No Image</div>
        )}
      </div>
      <div className={styles.trackInformation}>
        <h3>{track.name}</h3>
        <p>{track.artist}</p>
        <p>{track.album}</p>
      </div>
      {showAddButton && (
        <button
          title="Add to playlist"
          className={styles.trackButton}
          onClick={() => onAdd(track)}
        >
          +
        </button>
      )}

      {!showAddButton && onRemove && (
        <button
          title="Remove"
          className={styles.trackButton}
          onClick={() => onRemove(track)}
        >
          -
        </button>
      )}
    </div>
  );
}

export default Track;
