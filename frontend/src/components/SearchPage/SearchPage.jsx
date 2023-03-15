import { useState } from "react";
import { Link } from "react-router-dom";

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
                <button type="submit">
                Search
                </button>
            </Link>
        </form>
     );
}
 
export default SearchPage;