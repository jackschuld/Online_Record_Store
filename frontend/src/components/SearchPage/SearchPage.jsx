import { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchPage.css"

const SearchPage = () => {

    const [searchTerm, setSearchTerm] = useState('')


    return (
        <form>
            <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                />
            <Link to={`/${searchTerm}`}>
                <button type="submit" placeholder="Search by album, artist, song">Search</button>
            </Link>
        </form>
     );
}
 
export default SearchPage;