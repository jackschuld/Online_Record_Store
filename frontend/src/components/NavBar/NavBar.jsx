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
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <a><b>Record Store</b> on Line Ave.</a>
          </Link>
        </li>
        <li>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Profile
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">{user.username}</a>
              <a class="dropdown-item" href="#">Collection</a>
              <a class="dropdown-item" href="#">Wishlist</a>
              <a class="dropdown-item" href="#">
                {user ? (
                  <a onClick={logoutUser}>Logout</a>
                ) : (
                  <a onClick={() => navigate("/login")}>Login</a>
                )}
              </a>
            </div>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default Navbar;