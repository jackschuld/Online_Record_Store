import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import "./AlbumResults.css"
import axios from "axios";

const AlbumResults = () => {
    
  const [albums, setAlbums] = useState([]);
  const {searchTerm} = useParams();


  useEffect(() => {
    const fetchAlbums = async () => {
      let response = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=album&limit=50`, {
        headers: {
          Accept: 'application/json',
          Authorization: "Bearer " + localStorage.getItem('spotify-token'),
          'Content-Type': 'application/json',
        },
      });
      setAlbums(response.data.albums.items);
      }
    fetchAlbums();
  }, [searchTerm]);


  if (searchTerm){

    return (
      <div className="results">
            {albums && albums.map((album) => {
              let { height, url, width } = album.images[1];
              
              return(
                <Link className="thumbnails" to={`/${searchTerm}/${album.id}`}>
                    <button><p key={album.id}>
                        <iframe scrolling="no" width={width} height={height} src={url}></iframe><br/>
                        {album.name}<br/>
                        By: <br/>
                        {album.artists.map((artist)=> (
                          artist.name
                          ))}<br/>
                          <br/>
                    </p></button>
                </Link>
            )})}
        </div>
    );
  }
}
 
export default AlbumResults;