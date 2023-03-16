import Review from "../Review/Review.jsx"
import axios from 'axios';
import { useEffect, useState } from 'react';


const Reviews = ({ album_id, user }) => {

    const [reviews, setReviews] = useState([]);

    async function getAllReviews() {
        let response = await axios.get("http://127.0.0.1:8000/api/reviews/" + album_id + "/reviews/");
        setReviews(response.data);
    }

    useEffect(()=>{
        getAllReviews();
    }, [reviews])

    let reviewList = reviews.map((review) => <Review review={review} user={user}/>)
    
    return ( 
        <div>
            <h2>Reviews</h2>
            {reviewList.reverse()}
        </div>
     );
}
 
export default Reviews;