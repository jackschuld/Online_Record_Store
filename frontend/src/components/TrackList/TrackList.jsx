import { useEffect, useState } from "react";
import axios from "axios";

const TrackList = ({ album_id }) => {

    const [tracks, setTracks] = useState([])

    useEffect(() => {
        const fetchTracks = async () => {
            let response = await axios.get(`https://api.spotify.com/v1/albums/${album_id}/tracks`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('spotify-token'),
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data)
            setTracks(response.data.items)
        }
        fetchTracks()
    }, [])

    return ( 
        <div>
            {tracks.map((track)=> {
                return (
                    <p>
                        {track.track_number}. {track.name}
                    </p>
                )
            })}
        </div>
     );
}
 
export default TrackList;