import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import TrackList from "../TrackList/TrackList";

const Album = () => {

    const {album_id} = useParams();
    const [album, setAlbum] = useState([])
    const [artist, setArtist] = useState('')
    const src = `https://open.spotify.com/embed?uri=${album.uri}`


    useEffect(() => {
        const fetchAlbum = async () => {
            let response = await axios.get(`https://api.spotify.com/v1/albums/${album_id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('spotify-token'),
                    'Content-Type': 'application/json',
                },
            });
            setAlbum(response.data)
            setArtist(response.data.artists[0].name)
        }
        fetchAlbum();
        console.log(album)
    }, []);

    return ( 
        <div>
            <p>
                <h1>{album.name}</h1>
                <br/>
                <h4>by: {artist}</h4>
                <br/>
                Release Date: {album.release_date}
                <br/>
                Rating: {(album.popularity / 10) / 2}/5
                <br/>
                Number of Tracks: {album.total_tracks}
                <br/>
                Label: {album.label}
            </p>
            <iframe src={src} width="100%" height="800" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            {/* <TrackList album_id={album_id}/> */}
        </div>
     );
}
 
export default Album;