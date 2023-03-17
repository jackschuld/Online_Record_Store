import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user } = useContext(AuthContext);

    return ( 
        <div>
            <h3>{user.username}</h3>
            <Link to={'/profile/collection'}>
                <button>Collection</button>
            </Link>
            <Link to={'/profile/wishlist'}>
                <button>Wishlist</button>
            </Link>
        </div>
     );
}
 
export default Profile;