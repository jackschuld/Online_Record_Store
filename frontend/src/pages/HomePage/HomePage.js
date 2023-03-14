import React from "react";

import "../../components/AlbumResults/AlbumResults.jsx"
import Genres from "../../components/Genres/Genres.jsx"


const HomePage = ({setSearchTerm}) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  // TODO: Add an AddCars Page to add a car for a logged in user's garage
  
  return (
    <div className="container">
      <h3>Categories</h3>
      <Genres setSearchTerm={setSearchTerm}/>
    </div>
  );
};

export default HomePage;
