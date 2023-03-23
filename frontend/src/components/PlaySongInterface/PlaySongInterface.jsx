import axios from "axios";
import { useEffect, useState } from "react";
import SpotifyPlayer from 'react-spotify-player';

const PlaySongInterface = ({ selectedTrack, setSelectedTrack, tracks }) => {
  const [device, setDevice] = useState("");

  const fetchDevice = async () => {
    let response = await axios.get("https://api.spotify.com/v1/me/player/devices", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("spotify-token"),
        "Content-Type": "application/json",
      },
    });
    setDevice(response.data.devices[0].id);
  };

//   const playSong = async (device) => {
//     console.log(selectedTrack)
//     let response = await axios.put(
//       `https://api.spotify.com/v1/me/player/play?device_id=${device}`,
//       {
//         data: {
//           uris: "selectedTrack.uri",
//           offset: "selectedTrack.track_number",
//           position_ms: 0,
//         },
//       },
//       {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + localStorage.getItem("spotify-token"),
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   };

// const playSong = async () => {
//     console.log(selectedTrack)
//     let respone = await axios.get(`https://api.spotify.com/v1/tracks/${selectedTrack.id}`,
//     {

//     })
// }


const size = {
    widht: '100%',
    height: '300',
};

const src = `https://open.spotify.com/embed?uri=${selectedTrack.uri}`


useEffect(() => {
  fetchDevice();
  console.log(src)
}, []);

  return (
    <div>
      <p>{selectedTrack.name}</p>
      <iframe src={src} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      {/* <SpotifyPlayer
        uri={selectedTrack.uri}
        size={size}
        view="black"
        theme="list"
        allow="encrypted-media"
        /> */}
      {/* <button onClick={() => playSong(device)}>Play</button> */}
    </div>
  );
};

export default PlaySongInterface;