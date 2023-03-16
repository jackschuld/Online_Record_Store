import axios from "axios";
import { useEffect, useState } from "react";
// import SpotifyPlayer from 'react-spotify-player';

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

  useEffect(() => {
    fetchDevice();
  }, []);

  return (
    <div>
      <p>{selectedTrack.name}</p>
      {/* <SpotifyPlayer
        uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
        size="large"
        view="black"
        theme="list"
        /> */}
      {/* <button onClick={() => playSong(device)}>Play</button> */}
    </div>
  );
};

export default PlaySongInterface;