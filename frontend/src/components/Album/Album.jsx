import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Reviews from "../Reviews/Reviews";
import SaveAlbum from "../SaveAlbum/SaveAlbum";
import useAuth from "../../hooks/useAuth";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import "./Album.css";

const Album = ({ setSrc, src }) => {

    const [user, token, config] = useAuth();
    
    const {album_id} = useParams();
    const [album, setAlbum] = useState([]);
    const [artist, setArtist] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    // Loads album
    useEffect(() => {
        const fetchAlbum = async () => {
            let response = await axios.get(`https://api.spotify.com/v1/albums/${album_id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('spotify-token'),
                    'Content-Type': 'application/json',
                },
            });
            setAlbum(response.data);
            setArtist(response.data.artists[0].name);
            setSrc(`https://open.spotify.com/embed?uri=${album.uri}`);
        }
        fetchAlbum();
        console.log("hi")
    }, [src]);


    // Posts review
    async function leaveReview(newReview){
        let url = "http://127.0.0.1:8000/api/reviews/" + album_id + "/";
        await axios.post(url, newReview, config);
        window.location.reload();
    }

    // Checks if review is formatted correctly
    function handleNewReview(event) {
        if (localStorage.getItem("token")){
            event.preventDefault();
            let finalRating = rating / 10;
            if (finalRating <= 5 && finalRating >= 0){
                let newReview = {
                    user: user.username,
                    star_review: parseFloat(finalRating),
                    written_review: review,
                };
                leaveReview(newReview);
            }
            else {
                alert("Can only rate from 1 to 5");
            }
        }
        else {
            alert('Must be signed in!');
        }
    }

    return ( 
        <div className="album-description">
            <div className="row">
                <div className="col-md-8">
                    <p>
                        <h1>{album.name}</h1>
                        <br/>
                        <h4>by: {artist}</h4>
                        <SaveAlbum user={user} album_id={album_id} config={config}/>
                        <br/>
                        Release Date: {album.release_date}
                        <br/>
                        Rating: {(album.popularity / 10) / 2}/5
                        <br/>
                        Number of Tracks: {album.total_tracks}
                        <br/>
                        Label: {album.label}
                        <br/>
                        <br/>
                        <form className="review-form" onSubmit={handleNewReview}>
                            <label><b>Leave a review:</b></label>
                            <br/>
                            <div className="slidecontainer">
                                <input type="range" min="0" max="50" value={rating} class="slider" id="myRange" onChange={(event) => setRating(parseFloat(event.target.value))}/>
                                <p>Value: {rating / 10}</p>
                            </div>
                            <br/>
                            <div className="written-review">
                                <p>Write your thoughts:</p>
                                <input placeholder="" value={review} onChange={(event) => setReview(event.target.value)}/>
                            </div>
                            <button type='submit'>Submit</button>
                        </form>
                        <br/>
                        <Reviews album_id={album_id} user={user} config={config}/>
                    </p>
                </div>
                <div className="col-md-4">
                    <RelatedVideos album={album}/>
                </div>
            </div>
        </div>
     );
}
 
export default Album;