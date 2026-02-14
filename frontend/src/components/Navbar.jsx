import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.log("Invalid token");
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">ShopSphere</Link>
      </div>

      <div className="nav-links">
        <Link to="/products">Products</Link>

        {token && <Link to="/cart">Cart</Link>}

        {role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
