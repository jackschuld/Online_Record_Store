// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AlbumResults from "./components/AlbumResults/AlbumResults";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import { useEffect, useState } from "react";

function App() {

  const [searchTerm, setSearchTerm] = useState('')

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
    // localStorage.getItem('spotify-token')
  }

  useEffect(()=>{
    getAccessToken();
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage setSearchTerm={setSearchTerm}/>
            </PrivateRoute>
          }
        />
        <Route path="/:searchTerm" element={<AlbumResults searchTerm={searchTerm}/>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
