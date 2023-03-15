import { Link } from "react-router-dom";

const Decades = () => {


    return ( 
        <div>
            <Link to={'/year:1950-1959'}>
            <button>1950-1959</button>
            </Link>
            <Link to={'/year:1960-1969'}>
            <button>1960-1969</button>
            </Link>
            <Link to={'/year:1970-1979'}>
            <button>1970-1979</button>
            </Link>
            <Link to={'/year:1980-1989'}>
            <button>1980-1989</button>
            </Link>
            <Link to={'/year:1990-1999'}>
            <button>1990-1999</button>
            </Link>
            <Link to={'/year:2000-2009'}>
            <button>2000-2009</button>
            </Link>
            <Link to={'/year:2010-2019'}>
            <button>2010-2019</button>
            </Link>
            <Link to={'/year:2020-2029'}>
            <button>2020-2029</button>
            </Link>
        </div>
     );
}
 
export default Decades;