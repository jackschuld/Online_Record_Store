import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TrackList from "../TrackList/TrackList";

const Album = () => {

    const {album_id} = useParams();
    const [album, setAlbum] = useState([])
    const [artist, setArtist] = useState('')
    const [height, setHeight] = useState(0)
    const [url, setUrl] = useState('')
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const fetchAlbum = async () => {
            let response = await axios.get(`https://api.spotify.com/v1/albums/${album_id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('spotify-token'),
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data)
            setAlbum(response.data)
            setHeight(response.data.images[0].height)
            setUrl(response.data.images[0].url)
            setWidth(response.data.images[0].width)
            setArtist(response.data.artists[0].name)
        }
        fetchAlbum();
    }, []);

    return ( 
        <div>
            <p>
                <iframe scrolling="no" width={width} height={height} src={url}></iframe>
                <br/>
                <h1>{album.name}</h1>
                <br/>
                <h4>by: {artist}</h4>
                <br/>
                Release Date: {album.release_date}
                <br/>
                Rating: {album.popularity / 10}
                <br/>
                Number of Tracks: {album.total_tracks}
                <br/>
                Label: {album.label}
                <TrackList album_id={album_id}/>
            </p>
        </div>
     );
}
 
export default Album;