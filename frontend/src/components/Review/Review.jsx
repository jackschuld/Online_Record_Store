

const Review = ({ review, user }) => {
    return ( 
        <div>
            <h3>@{user.username}:</h3>
            <p>
            {review.star_review}
            <br/>
            {review.written_review}
            </p>
        </div>
     );
}
 
export default Review;