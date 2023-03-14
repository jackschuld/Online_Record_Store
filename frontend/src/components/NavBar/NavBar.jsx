import React from "react";
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
        <li>
          {/* Left blank area */}
        </li>
        <li className="brand">
          {/* Title at center of nav */}
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <a><b>Record Store</b> on Line Ave.</a>
          </Link>
        </li>
        <li>
          {/* At the right, profile dropdown if logged in. Login button if not */}
          {!user ? (
            <button onClick={() => navigate("/login")}>Login</button>
          ) : (
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Profile
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">{user.username}</a>
              <a className="dropdown-item" href="#">Collection</a>
              <a className="dropdown-item" href="#">Wishlist</a>
              <a className="dropdown-item" href="#" onClick={logoutUser}>Logout</a>
            </div>
          </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;