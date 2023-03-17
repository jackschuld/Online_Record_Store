import { Link } from "react-router-dom";
import './Decades.css'

const Decades = () => {


    return ( 
        <ul>
            <li>
                <Link to={'/year:1920-1929'}>
                <button>1920-1929</button>
                </Link>
            </li>
            <li>
                <Link to={'/year:1930-1939'}>
                <button>1930-1939</button>
                </Link>
            </li>
            <li>
                <Link to={'/year:1940-1949'}>
                <button>1940-1949</button>
                </Link>
            </li>
            <li>
                <Link to={'/year:1950-1959'}>
                <button>1950-1959</button>
                </Link>
            </li>
            <li>
                <Link to={'/year:1960-1969'}>
                <button>1960-1969</button>
                </Link>
            </li>
            <li>
                <Link to={'/year:1970-1979'}>
                <button>1970-1979</button>
                </Link>
            </li>
            <li>
                <Link to={'/year:1980-1989'}>
                <button>1980-1989</button>
                </Link>
            </li>
            <li>
                <Link to={'/year:1990-1999'}>
                <button>1990-1999</button>
                </Link>
            </li>
            <li>
                <Link to={'/year:2000-2009'}>
                <button>2000-2009</button>
                </Link>
            </li>
            <li>
                <Link to={'/year:2010-2019'}>
                <button>2010-2019</button>
                </Link>
            </li>
            <li>
                <Link to={'/year:2020-2029'}>
                <button>2020-2029</button>
                </Link>
            </li>
        </ul>
     );
}
 
export default Decades;