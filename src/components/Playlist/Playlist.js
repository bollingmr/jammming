import React from "react";
import styles from "./Playlist.module.css";

function Playlist() {
  return (
    <div className={styles.playlist}>
      <h2>Playlist</h2>
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
