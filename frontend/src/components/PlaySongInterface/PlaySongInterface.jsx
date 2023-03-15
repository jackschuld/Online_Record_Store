import axios from "axios";
import { useEffect, useState } from "react";

const PlaySongInterface = ({ selectedTrack, setSelectedTrack, tracks }) => {
  const [device, setDevice] = useState("");

  const fetchDevice = async () => {
    let response = await axios.get("https://api.spotify.com/v1/me/player/devices", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("s_token"),
        "Content-Type": "application/json",
      },
    });
    setDevice(response.data.devices[0].id);
  };

  const playSong = async (device) => {
    console.log(selectedTrack)
    let response = await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${device}`,
      {
        data: {
          uris: "selectedTrack.uri",
          offset: "selectedTrack.track_number",
          position_ms: 0,
        },
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("s_token"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  useEffect(() => {
    fetchDevice();
  }, []);

  return (
    <div>
      <p>{selectedTrack.name}</p>
      <button onClick={() => playSong(device)}>Play</button>
    </div>
  );
};

export default PlaySongInterface;