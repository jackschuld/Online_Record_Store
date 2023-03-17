import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Reviews from "../Reviews/Reviews";
import SaveAlbum from "../SaveAlbum/SaveAlbum";
import useAuth from "../../hooks/useAuth";


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
            if (rating <= 5 && rating >= 0){
                let newReview = {
                    user: user.username,
                    star_review: parseFloat(rating),
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
        <div>
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
                <form onSubmit={handleNewReview}>
                    <label><b>Review:</b></label>
                    <div>
                        <input type="number" value={rating} onChange={(event) => setRating(parseFloat(event.target.value))}/>
                    </div>
                    <div>
                        <input placeholder="Leave the album a review!" value={review} onChange={(event) => setReview(event.target.value)}/>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
                <br/>
                <Reviews album_id={album_id} user={user} config={config}/>
            </p>
        </div>
     );
}
 
export default Album;