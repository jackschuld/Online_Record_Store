import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RelatedVideos = ({ album }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function getVideoResults() {
            let url = `https://youtube.googleapis.com/youtube/v3/search?maxResults=8&type=video&part=snippet&q=${album.name}-album-video&key=AIzaSyAA6Tm4VdnvNbJWOcDPaw3B3huwt5V_bvQ`;
            let response = await axios.get(url);
            setVideos(response.data.items);
            console.log(response.data.items)
        }
        getVideoResults();
    }, [album]);



    return ( 
        <div>
            <h4>Related Videos</h4>
            {videos.map((video)=>{
                let { url, width, height } = video.snippet.thumbnails.medium;
                let src = `https://www.youtube.com/embed/${video.id.videoId}`;

                return(
                    <span>
                        <iframe id="ytplayer" type="text/html" width={width} height={height} src={src} allowFullScreen></iframe>
                        {/* {video.snippet.title} */}
                    </span>
                )
            })}
        </div>
     );
}

export default RelatedVideos;