import AlbumResults from "../AlbumResults/AlbumResults";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Genres = ({setSearchTerm}) => {

    const [genres, setGenres] = useState([])

    useEffect(() => {
        const fetchGenres = async () => {
            let response = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
                headers: {
                    Accept: 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('spotify-token'),
                    'Content-Type': 'application/json',
                },
            });
            setGenres(response.data.genres)
        }
        fetchGenres();
    }, [])

    function handleGenreSeletion(genre){
        setSearchTerm(genre);
    }

    return ( 
        <div className="genres">
            {genres && genres.map((genre) => {
                return(
                <Link to={`/${genre}`}>
                    <button type='submit' onClick={handleGenreSeletion(genre)}>{genre}</button>
                </Link>
            )})}
        </div>
     );
}
 
export default Genres;