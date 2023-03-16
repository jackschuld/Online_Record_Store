import axios from "axios";

const Review = ({ review, user, album_id, config }) => {

    async function handleDelete() {
        if (user.id === review.user_id){
            console.log(review)
            let url = "http://127.0.0.1:8000/api/reviews/" + album_id + "/" + review.id + "/"
            let response = await axios.delete(url, config);
            console.log(response)
        }
        else {
            alert('Must be signed in!');

        }
    }

    return ( 
        <div>
            <h3>@{user.username}:</h3>
            <p>
            {review.star_review}
            <br/>
            {review.written_review}
            </p>
            <button onClick={handleDelete}>Delete</button>
        </div>
     );
}
 
export default Review;