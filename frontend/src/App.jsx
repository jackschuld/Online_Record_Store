// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

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
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Profile from "./components/Profile/Profile";
import Collection from "./components/Collection/Collection";
import Wishlist from "./components/Wishlist/Wishlist";
import Decades from "./components/Decades/Decades";


// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import { useEffect, useState } from "react";


function App() {
  const [src, setSrc] = useState('');

  async function getAccessToken(){
    const clientId = "1062ec374487407eb597e2e70e02a000";
    const clientSecret = "aded918113254101aaf48ef3904eed6b";
    const encoded = btoa(`${clientId}:${clientSecret}`);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${encoded}`
    };
  
    const data = new URLSearchParams({
      "grant_type": "client_credentials"
    });
  
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: headers,
      body: data
    });
  
    if (!response.ok) {
      throw new Error("Failed to obtain access token");
    }
  
    const tokenData = await response.json();
    const spotifyToken = tokenData.access_token;
    localStorage.setItem('spotify-token', spotifyToken)
  }

  useEffect(()=>{
    getAccessToken();
  }, [])

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <Navbar />
          <Routes>
            <Route path="/" element={<Decades/>}/>
            <Route path="/:searchTerm" element={<AlbumResults />}/>
            <Route path="/:searchTerm/:album_id" element={<Album setSrc={setSrc} src={src}/>}/>
            <Route path="/search" element={<SearchPage />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/profile/collection" element={<Collection />} />
            <Route path="/profile/wishlist" element={<Wishlist />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Footer />
        </div>
        <div className="col-md-4">
          {src ? <MusicPlayer src={src}/> : <MusicPlayer src={"https://open.spotify.com/embed?uri=spotify:album:5MqyhhHbT13zsloD3uHhlQ"}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
