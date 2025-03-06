import React from "react";
import styles from "./Playlist.module.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({ playlistName, setPlaylistName, playlistTracks, onRemove, savePlaylist }) {
  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleFocus = () => {
    if (playlistName === "Enter Playlist Name...") {
      setPlaylistName("");
    }
  };

  const handleBlur = () => {
    if (playlistName === "") {
      setPlaylistName("Enter Playlist Name...");
    }
  };

  const inputClass = playlistName === "Enter Playlist Name..." ? styles.inputGray : "";

  return (
    <div className={styles.playlist}>
      <h2>
        <input
          type="text"
          value={playlistName}
          onChange={handleNameChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClass}
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
