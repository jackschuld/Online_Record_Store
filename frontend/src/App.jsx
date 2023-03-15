// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchPage from "./components/SearchPage/SearchPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AlbumResults from "./components/AlbumResults/AlbumResults";
import Album from "./components/Album/Album";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import { useEffect, useState } from "react";

function App() {
  
  const clientId = "1062ec374487407eb597e2e70e02a000";
  const clientSecret = "aded918113254101aaf48ef3904eed6b";
  const redirectUri = "http://localhost:3000/callback";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  const [spotifyToken, setSpotifyToken] = useState('')
  const scopes = [
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state"
  ]
  
  // async function getAccessToken(code){

  //   const headers = {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     "Authorization": `Basic ${btoa(`${clientId}:${clientSecret}`)}`
  //   };
  
  //   const data = new URLSearchParams({
  //     "grant_type": "authorization_code",
  //     "code": code,
  //     "redirect_uri": redirectUri
  //   });
  
  //   const response = await fetch("https://accounts.spotify.com/api/token", {
  //     method: "POST",
  //     headers: headers,
  //     body: data
  //   });
  
  //   if (!response.ok) {
  //     throw new Error("Failed to obtain access token");
  //   }
  
  //   const tokenData = await response.json();
  //   const spotifyToken = tokenData.access_token;
  //   localStorage.setItem('spotify-token', spotifyToken);
  // }

  useEffect(()=>{
    const hash = window.location.hash
    let s_token = window.localStorage.getItem("s_token")

    if (!s_token && hash) {
      s_token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("s_token", s_token)
    }

    setSpotifyToken(s_token)
    // const code = new URLSearchParams(window.location.search).get("code");
    // if (code) {
    //   getAccessToken(code);
    // }
  }, [])

  const logout = () => {
    setSpotifyToken("")
    window.localStorage.removeItem("token")
}

  return (
    <div>
      <div className="App">
        <header className="App-header">
          {!spotifyToken ? 
          <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=${responseType}`}>Login to Spotify</a>
          : <button onClick={logout}>Logout</button>}
        </header>
      </div>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage/>
              </PrivateRoute>
            }
            />
          <Route path="/:searchTerm" element={<AlbumResults />}/>
          <Route path="/:searchTerm/:searchTerm/:album_id" element={<Album />}/>
          <Route path="/search" element={<SearchPage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
