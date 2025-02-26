import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";

function App() {
  const [tracks, setTracks] = useState([
    {
      id: 1,
      name: "Tiny Dancer",
      artist: "Elton John",
      album: "Madman Across The Water",
    },
    {
      id: 2,
      name: "Large Dancer",
      artist: "Tim McGraw",
      album: "Love Story",
    },
    {
      id: 3,
      name: "More Dancers",
      artist: "Rockabye Baby!",
      album: "Lullaby Renditions of Elton John",
    },
    {
      id: 4,
      name: "Small Dancer",
      artist: "Ben Folds",
      album: "Ben Folds Live",
    },
    {
      id: 5,
      name: "Great Dancer",
      artist: "The White Raven",
      album: "Tiny Dancer",
    },
    {
      id: 6,
      name: "Poor Dancer",
      artist: "Elton John",
      album: "Madman Across The Water",
    },
    {
      id: 7,
      name: "Rich Dancer",
      artist: "Tim McGraw",
      album: "Love Story",
    },
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Ja<span className="mmm">mmm</span>ing
        </h1>
      </header>
      <main>
        <section className="search-container">
          <SearchBar />
        </section>

        <section className="results-and-playlist">
          <div className="search-results">
            {/* Left side */}
            <SearchResults tracks={tracks} />
          </div>
          <div className="playlist">
            {/* Right side */}
            <Playlist />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
