import axios from "axios";

const SaveAlbum = ({ user, album_id, config }) => {

    async function addAlbumToCollection(albumJson){
        console.log(albumJson)
        console.log(config)
        let url = "http://127.0.0.1:8000/api/album_collections/" + album_id + "/";
        let response = await axios.post(url, albumJson, config);
        console.log(response)
    }

    async function addAlbumToWishlist(albumJson){
        console.log(albumJson)
        console.log(config)
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
        }
        else {
            alert('Must be signed in!');
        }
    }


    return ( 
        <div>
            <button onClick={handleAlbumCollection}>Add to Collection</button>
            <button onClick={handleAlbumWishlist}>Add to Wishlist</button>
        </div>
     );
}
 
export default SaveAlbum;