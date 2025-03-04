const clientId = "78ec113d1816441d85356d15687618c0"; // Spotify Client ID
const redirectUri = "https://rad-queijadas-b789cf.netlify.app/"; // On Spotify Dashboard
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Check if the access token is in the URL
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Clear the token after it expires
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      // Remove the token from the URL for security
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      // Redirect to Spotify's authorization page
      const scopes = ["playlist-modify-public", "playlist-modify-private"];
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token&show_dialog=true`;
      window.location = authUrl;
    }
  },

  search(term) {
    const token = Spotify.getAccessToken(); // Ensure we have a token

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        // Map the returned tracks to a format that matches your app
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists.map((artist) => artist.name).join(", "),
          album: track.album.name,
          uri: track.uri,
          // We'll store the album image URL separately so we can display it
          albumArt:
            track.album.images && track.album.images.length ? track.album.images[0].url : null,
        }));
      });
  },

  // A placeholder for saving the playlist (you can expand this to call the Spotify API)
  async savePlaylist(playlistName, trackURIs) {
    const token = Spotify.getAccessToken();
    if (!playlistName || !trackURIs.length) return;

    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
    let userId;

    // **Step 1: Get the Current User’s Spotify ID**
    try {
      const userResponse = await fetch("https://api.spotify.com/v1/me", { headers });
      const userData = await userResponse.json();
      userId = userData.id;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return;
    }

    // **Step 2: Create a New Playlist**
    let playlistId;
    try {
      const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "POST",
        headers,
        body: JSON.stringify({ name: playlistName, public: false }),
      });
      const playlistData = await playlistResponse.json();
      playlistId = playlistData.id;
    } catch (error) {
      console.error("Error creating playlist:", error);
      return;
    }

    // **Step 3: Add Tracks to the Playlist**
    try {
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers,
        body: JSON.stringify({ uris: trackURIs }),
      });
      console.log(`Playlist "${playlistName}" saved successfully.`);
    } catch (error) {
      console.error("Error adding tracks to playlist:", error);
    }
  },
};

export default Spotify;
