import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./services/Spotify";

function App() {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("Enter Playlist Name...");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const searchSpotify = (term) => {
    Spotify.search(term).then((searchResults) => {
      const filteredResults = searchResults.filter(
        (track) => !playlistTracks.find((playlistTrack) => playlistTrack.id === track.id)
      );
      setTracks(filteredResults);
    });
  };

  const onAdd = (track) => {
    if (!playlistTracks.find((playlistTrack) => playlistTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
      setTracks(tracks.filter((searchTrack) => searchTrack.id !== track.id));
    }
  };

  const onRemove = (track) => {
    setPlaylistTracks(playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id));
    setTracks([...tracks, track]);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Ja<span className="mmm">mmm</span>ing
        </h1>
      </header>
      <main>
        <section className="search-container">
          <SearchBar onSearch={searchSpotify} />
        </section>

        <section className="results-and-playlist">
          <div className="search-results">
            <SearchResults
              tracks={tracks}
              onAdd={onAdd}
            />
          </div>
          <div className="playlist">
            <Playlist
              playlistName={playlistName}
              setPlaylistName={setPlaylistName}
              playlistTracks={playlistTracks}
              onRemove={onRemove}
              savePlaylist={savePlaylist}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
