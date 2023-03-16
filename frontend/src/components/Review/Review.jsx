import axios from "axios";

const Review = ({ review, user, album_id, config }) => {

    async function handleDelete() {
        let url = "http://127.0.0.1:8000/api/reviews/" + album_id + "/" + review.id + "/"
        await axios.delete(url, config);
        window.location.reload();
    }

    return ( 
        <div>
            <h3>@{review.username}:</h3>
            <p>
            Rating: {review.star_review} / 5
            <br/>
            "{review.written_review}"
            </p>
            {user.id === review.user_id ? <button onClick={handleDelete}>Delete</button> : <br/>}
        </div>
     );
}
 
export default Review;