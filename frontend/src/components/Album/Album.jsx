import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Reviews from "../Reviews/Reviews";

const Album = () => {

    const [user, token, config] = useAuth();
    
    const {album_id} = useParams();
    const [album, setAlbum] = useState([]);
    const [artist, setArtist] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const src = `https://open.spotify.com/embed?uri=${album.uri}`;


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
    }, []);


    async function addAlbumToCollection(newReview){
        if (localStorage.getItem("token")){
            let url = "http://127.0.0.1:8000/api/reviews/" + album_id + "/";
            await axios.post(url, newReview, config);
        }
        else {
            alert('Must be signed in!');
        }
    }

    function handleNewReview(event) {
        if (localStorage.getItem("token")){
            event.preventDefault();
            let newReview = {
                star_review: parseInt(rating),
                written_review: review,
            };
            addAlbumToCollection(newReview);
        }
    }

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
                <br/>
                <form onSubmit={handleNewReview}>
                    <label>Review</label>
                    <div>
                        <input style={{width: '150px'}} type="number" value={rating} onChange={(event) => setRating(event.target.value)}/>
                        <input placeholder="Leave the album a review!" value={review} onChange={(event) => setReview(event.target.value)}/>
                        <button type='submit'>Favorite</button>
                    </div>
                </form>
                <br/>
                <Reviews album_id={album_id} user={user}/>
            </p>
            <iframe src={src} width="100%" height="800" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
     );
}
 
export default Album;