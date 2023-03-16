import { useEffect, useState } from "react";
import axios from "axios";

import PlaySongInterface from "../PlaySongInterface/PlaySongInterface";

const TrackList = ({ album_id }) => {

    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState([]);


    useEffect(() => {
        const fetchTracks = async () => {
            let response = await axios.get(`https://api.spotify.com/v1/albums/${album_id}/tracks`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('spotify-token'),
                    'Content-Type': 'application/json',
                },
            });
            setTracks(response.data.items)
        }
        fetchTracks()
    }, [])

    function handleSelection(track){
        setSelectedTrack(track)
    }

    return ( 
        <div>
            {/* <PlaySongInterface selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} tracks={tracks}/> */}
            <ol>
                {tracks.map((track)=> {
                    return (
                        <li onClick={() => handleSelection(track)}>
                            {track.track_number}. {track.name}
                        </li>
                    )
                })}
            </ol>
        </div>
     );
}
 
export default TrackList;