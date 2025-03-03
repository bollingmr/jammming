import React from "react";
import styles from "./Playlist.module.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({ playlistName, setPlaylistName, playlistTracks, onRemove, savePlaylist }) {
  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  return (
    <div className={styles.playlist}>
      <h2>
        <input
          type="text"
          value={playlistName}
          onChange={handleNameChange}
        />
      </h2>
      <Tracklist
        tracks={playlistTracks}
        showAddButton={false}
        onRemove={onRemove}
      />
      <button
        className={styles.save}
        onClick={savePlaylist}
      >
        Save to Spotify
      </button>
    </div>
  );
}

export default Playlist;
