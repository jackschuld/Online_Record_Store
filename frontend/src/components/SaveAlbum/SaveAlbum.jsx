import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


const SaveAlbum = ({ id_of_album }) => {
    
    // const [wishlistAlbums, setWishlistAlbums] = useState([]);
    // const [CollectionAlbum, setCollectedAlbums] = useState([]);
    const [user, token, config] = useAuth();
    const [isInCollection, setIsInCollection] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [collectedAlbums, setCollectedAlbums] = useState([]);
    const [wishlistAlbums, setWishlistAlbums] = useState([]);
    const [albumCollectionId, setAlbumCollectionId] = useState(0);
    const [albumWishlistId, setAlbumWishlistId] = useState(0); 


    useEffect(() => {
        const fetchAlbums = async () => {
            let collectionResponse = await axios.get("http://127.0.0.1:8000/api/album_collections/" + user.id + "/collection/");
            let wishlistResponse = await axios.get("http://127.0.0.1:8000/api/album_wishlists/" + user.id + "/wishlist/");
            setCollectedAlbums(collectionResponse.data);
            setWishlistAlbums(wishlistResponse.data);
        }
        fetchAlbums();
    }, []);


    useEffect(() => {
        const checkIfOwned = () => {
            if (collectedAlbums.length > 0){
                for (let i = 0; i < collectedAlbums.length; i++){
                    if (collectedAlbums[i].album_id === id_of_album){
                        setIsInCollection(true);
                        setAlbumCollectionId(collectedAlbums[i].id);
                    }
                }
            }
            if (wishlistAlbums.length > 0){
                for (let i = 0; i < wishlistAlbums.length; i++){
                    if (wishlistAlbums[i].album_id === id_of_album){
                        setIsInWishlist(true);
                        setAlbumWishlistId(wishlistAlbums[i].id);
                    }
                }
            }
        }
        checkIfOwned();
    }, [collectedAlbums, wishlistAlbums]);

    
    async function addAlbumToCollection(albumJson){
        let url = "http://127.0.0.1:8000/api/album_collections/" + id_of_album + "/";
        await axios.post(url, albumJson, config);
    }

    async function addAlbumToWishlist(albumJson){
        let url = "http://127.0.0.1:8000/api/album_wishlists/" + id_of_album + "/";
        await axios.post(url, albumJson, config);
    }

    function handleAlbumCollection(){
        if (localStorage.getItem("token")){
            let albumJson = {
                user: user,
                album_id: id_of_album,
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
                album_id: id_of_album,
            };
            addAlbumToWishlist(albumJson);
            setIsInWishlist(true)
        }
        else {
            alert('Must be signed in!');
        }
    }


    async function handleAlbumCollectionRemoval(){
        let url = "http://127.0.0.1:8000/api/album_collections/remove/" + albumCollectionId + "/";
        await axios.delete(url, config);
        setIsInCollection(false);
        window.location.reload();
    }

    async function handleWishlistRemoval(){
        let url = "http://127.0.0.1:8000/api/album_wishlists/remove/" + albumWishlistId + "/";
        await axios.delete(url, config);
        setIsInWishlist(false);
        window.location.reload();
    }

    return ( 
        <div>
            {!isInCollection ? <button onClick={handleAlbumCollection}>Add to Collection</button> : <button onClick={handleAlbumCollectionRemoval}>Remove from Collection</button>}
            {!isInWishlist ? <button onClick={handleAlbumWishlist}>Add to Wishlist</button> : <button onClick={handleWishlistRemoval}>Remove from Wishlist</button>}
        </div>
     );
}
 
export default SaveAlbum;