import useAuth from "../../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import WishlistAlbum from "../WishlistAlbum/WishlistAlbum"

const Wishlist = () => {
    const [user, token, config] = useAuth();
    const [wishlistAlbums, setWishlistAlbums] = useState([])

    useEffect(() => {
        const fetchCollectedAlbums = async () => {
            let response = await axios.get("http://127.0.0.1:8000/api/album_wishlists/" + user.id + "/wishlist/");
            setWishlistAlbums(response.data);
        }
        fetchCollectedAlbums();
    }, []);


    let wishlistList = wishlistAlbums.map((wishlistAlbum) => <WishlistAlbum wishlistAlbum={wishlistAlbum} config={config}/>)

    return ( 
        <div className="col-or-wish">
            <h3>Collection</h3>
            <p>Below are the albums that @{user.username} has collected!</p>
            {wishlistList.reverse()}
        </div>
     );
}
 
export default Wishlist;