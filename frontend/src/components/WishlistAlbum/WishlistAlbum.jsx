import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WishlistAlbum = ({ wishlistAlbum, config }) => {

    const [album, setAlbum] = useState([]);
    const [image, setImage] = useState([]);
    let { height, url, width } = image;

    
    useEffect(() => {
        const fetchAlbum = async () => {
            let response = await axios.get(`https://api.spotify.com/v1/albums/${wishlistAlbum.album_id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('spotify-token'),
                    'Content-Type': 'application/json',
                },
            });
            setAlbum(response.data);
            setImage(response.data.images[1]);
        }
        fetchAlbum();
    }, []);

    
    async function handleDelete() {
        let url = "http://127.0.0.1:8000/api/album_wishlists/remove/" + wishlistAlbum.id + "/";
        await axios.delete(url, config);
        window.location.reload();
    }


    if (image){
        return ( 
            <div className="col-or-wish">
                <Link to={`/wishlist/${album.id}`}>
                    <button>
                        <p key={album.id}>
                            <iframe scrolling="no" width={width} height={height} src={url}></iframe><br/>
                        </p>
                    </button>
                </Link>
                <button onClick={handleDelete}>Remove</button>
            </div>
        );
    }

}
 
export default WishlistAlbum;