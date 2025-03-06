const clientId = "78ec113d1816441d85356d15687618c0"; // Spotify Client ID
const redirectUri =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/"
    : "https://bollingmr-jammming.netlify.app/"; // Production URL
// Redirect URIs from Spotify Dashboard
let accessToken;

const Spotify = {
  /**
   * Retrieves the access token from URL or requests authorization if not available.
   */
  getAccessToken() {
    if (accessToken) return accessToken;

    // Check if access token is present in the URL
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Clear the token after expiration
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);

      // Remove access token from URL for security
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    }

    // Redirect user to Spotify authorization page if no token is found
    const scopes = ["playlist-modify-public", "playlist-modify-private"];
    const authUrl =
      `https://accounts.spotify.com/authorize?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scopes.join(" "))}` +
      `&response_type=token&show_dialog=true`;

    window.location = authUrl;
  },

  /**
   * Searches for tracks on Spotify by a given search term.
   * @param {string} term - The search query.
   * @returns {Promise<Array>} - A promise resolving to an array of track objects.
   */
  async search(term) {
    const token = this.getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) return [];

    // Format and return relevant track data
    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      album: track.album.name,
      uri: track.uri,
      albumArt: track.album.images.length ? track.album.images[0].url : null,
    }));
  },

  /**
   * Saves a new playlist to the user's Spotify account.
   * @param {string} playlistName - The name of the playlist.
   * @param {Array} trackURIs - The URIs of the tracks to add.
   */
  async savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) return;
    const token = this.getAccessToken();
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    try {
      // Step 1: Get the current user's Spotify ID
      const userResponse = await fetch("https://api.spotify.com/v1/me", { headers });
      const userData = await userResponse.json();
      const userId = userData.id;

      // Step 2: Create a new playlist
      const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "POST",
        headers,
        body: JSON.stringify({ name: playlistName, public: false }),
      });
      const playlistData = await playlistResponse.json();
      const playlistId = playlistData.id;

      // Step 3: Add tracks to the newly created playlist
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers,
        body: JSON.stringify({ uris: trackURIs }),
      });

      console.log(`Playlist "${playlistName}" saved successfully.`);
    } catch (error) {
      console.error("Error saving playlist:", error);
    }
  },
};

export default Spotify;
