import axios from "axios";
import { useEffect, useState } from "react";

const SaveAlbum = ({ user, album_id, config }) => {
    
    const [wishlistAlbums, setWishlistAlbums] = useState([]);
    const [CollectionAlbum, setCollectedAlbums] = useState([]);
    const [isInCollection, setIsInCollection] = useState();
    const [isInWishlist, setIsInWishlist] = useState();
    
    async function addAlbumToCollection(albumJson){
        let url = "http://127.0.0.1:8000/api/album_collections/" + album_id + "/";
        let response = await axios.post(url, albumJson, config);
        console.log(response)
    }

    async function addAlbumToWishlist(albumJson){
        let url = "http://127.0.0.1:8000/api/album_wishlists/" + album_id + "/";
        let response = await axios.post(url, albumJson, config);
        console.log(response)
    }

    function handleAlbumCollection(){
        if (localStorage.getItem("token")){
            let albumJson = {
                user: user,
                album_id: album_id,
            };
            setIsInCollection(true)
            addAlbumToCollection(albumJson);
        }
        else {
            alert('Must be signed in!');
        }
    }

    function handleAlbumWishlist(){
        if (localStorage.getItem("token")){
            let albumJson = {
                user: user,
                album_id: album_id,
            };
            addAlbumToWishlist(albumJson);
            setIsInWishlist(true)
        }
        else {
            alert('Must be signed in!');
        }
    }

    return ( 
        <div>
            {!isInCollection ? <button onClick={handleAlbumCollection}>Add to Collection</button> : <button>Added to collection!</button>}
            {!isInWishlist ? <button onClick={handleAlbumWishlist}>Add to Wishlist</button> : <button>Added to wishlist</button>}
        </div>
     );
}
 
export default SaveAlbum;