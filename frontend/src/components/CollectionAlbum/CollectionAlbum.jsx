import axios from "axios";

const CollectionAlbum = ({ collectedAlbum, config }) => {


    async function handleDelete() {
        let url = "http://127.0.0.1:8000/api/album_collections/remove/" + collectedAlbum.id + "/";
        await axios.delete(url, config);
    }


    return ( 
        <div>
            <p>{collectedAlbum.album_id}</p>
            <button onClick={handleDelete}>Remove</button>
        </div>
     );
}
 
export default CollectionAlbum;