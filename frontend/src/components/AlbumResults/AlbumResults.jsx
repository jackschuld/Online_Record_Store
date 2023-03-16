import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
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
      console.log(response.data.albums.items)
      setAlbums(response.data.albums.items);
      }
    fetchAlbums();
  }, [searchTerm]);


  if (searchTerm){

    return (
      <div className="thumbnails">
            {albums && albums.map((album) => {
              let { height, url, width } = album.images[1];
              console.log(album.id)
              
              return(
                <Link to={`/${searchTerm}/${album.id}`}>
                    <button><p key={album.id}>
                        <iframe scrolling="no" width={width} height={height} src={url}></iframe><br/>
                        Title: {album.name}<br/>
                        By: {album.artists.map((artist)=> (
                          artist.name
                          ))}<br/>
                    </p></button>
                </Link>
            )})}
        </div>
    );
  }
}
 
export default AlbumResults;