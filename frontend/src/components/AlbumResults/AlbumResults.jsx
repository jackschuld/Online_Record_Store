import React from "react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import axios from "axios";

const AlbumResults = ({searchTerm}) => {
    

    const [albums, setAlbums] = useState([]);


  useEffect(() => {
    const fetchAlbums = async () => {
      let response = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=album&market=ES&limit=10&offset=5`, {
        headers: {
          Accept: 'application/json',
          Authorization: "Bearer " + localStorage.getItem('spotify-token'),
          'Content-Type': 'application/json',
        },
      });
      console.log(searchTerm)
      setAlbums(response.data.albums);
      }
    fetchAlbums();
  }, []);


  if (searchTerm){

    return (
      <div className="thumbnais">
            {albums && albums.map((album) => {
              let { height, url, width } = album.images[1];
              
              return(
                <Link to={`/${album.id}`}>
                    <p key={album.id}>
                        <iframe scrolling="no" width={width} height={height} src={url}></iframe><br/>
                        Title: {album.name}<br/>
                        By: {album.artists.map((artist)=> (
                          artist.name
                          ))}<br/>
                    </p>
                </Link>
            )})}
        </div>
    );
  }
}
 
export default AlbumResults;