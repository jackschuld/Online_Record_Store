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
            <span>
              <button className="btn" type="button" onClick={() => navigate("/login")}>Login</button>
            </span>
          ) : (
          <span>
            <button className="btn" type="button" aria-haspopup="true" aria-expanded="false">
              <Link to={'/'} className="link">Home</Link>
            </button>
            <button className="btn" type="button" aria-haspopup="true" aria-expanded="false">
              <Link to={'/search'} className="link">Search</Link>
            </button>
            <span class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                {user.username}
              </button>
              <span class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item">
                  <Link to={'/profile'}>Profile</Link>
                </a>
                <a>
                  <Link to={'/profile/collection'} class="dropdown-item">Collection</Link>
                </a>
                <a>
                  <Link to={'/profile/wishlist'} class="dropdown-item">Wishlist</Link>
                </a>
                <a>
                  <Link onClick={logoutUser} class="dropdown-item">Logout</Link>
                </a>
              </span>
            </span>
          </span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;