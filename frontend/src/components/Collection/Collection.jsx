import useAuth from "../../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CollectionAlbum from "../CollectionAlbum/CollectionAlbum";

const Collection = () => {
    const [user, token, config] = useAuth();
    const [collectedAlbums, setCollectedAlbums] = useState([])

    useEffect(() => {
        const fetchCollectedAlbums = async () => {
            let response = await axios.get("http://127.0.0.1:8000/api/album_collections/" + user.id + "/collection/");
            setCollectedAlbums(response.data);
        }
        fetchCollectedAlbums();
    }, []);


    let collectionList = collectedAlbums.map((collectedAlbum) => <CollectionAlbum collectedAlbum={collectedAlbum} config={config}/>)

    return ( 
        <div>
            <h3>Collection</h3>
            <p>Below are the albums that @{user.username} has collected!</p>
            {collectionList.reverse()}
        </div>
     );
}
 
export default Collection;