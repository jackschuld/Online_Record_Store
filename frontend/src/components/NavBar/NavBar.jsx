import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          {/* Title at left of nav */}
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <a><b>Record Store</b> on-Line Ave.</a>
          </Link>
        </li>
        <li>
          {/* Center blank area */}
        </li>
        <li>
          {/* At the right, profile dropdown if logged in. Login button if not */}
          {!user ? (
            <button onClick={() => navigate("/login")}>Login</button>
          ) : (
          <div>
            <button className="btn btn-secondary" type="button" aria-haspopup="true" aria-expanded="false">
              <Link to={'/profile'} className="link">{user.username}</Link>
            </button>
            <button className="btn btn-secondary" type="button" aria-haspopup="true" aria-expanded="false">
              <Link to={'/'} className="link">Home</Link>
            </button>
            <button className="btn btn-secondary" type="button" aria-haspopup="true" aria-expanded="false">
              <Link to={'/search'} className="link">Search</Link>
            </button>
            <button className="btn btn-secondary" type="button" aria-haspopup="true" aria-expanded="false">
              <Link to={'/profile/collection'} className="link">Collection</Link>
            </button>
            <button className="btn btn-secondary" type="button" aria-haspopup="true" aria-expanded="false">
              <Link to={'/profile/wishlist'} className="link">Wishlist</Link>
            </button>
            <button className="btn btn-secondary" type="button" aria-haspopup="true" aria-expanded="false">
              <Link onClick={logoutUser} className="link">Logout</Link>
            </button>
          </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;