import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Home.css";

function Home() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, optionally auto redirect
    // Uncomment below if you want auto redirect instead of button change

    // if (token) {
    //   navigate("/products");
    // }
  }, [token, navigate]);

  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to ShopSphere</h1>
        <p>
          Discover premium products at unbeatable prices.
          Fast delivery. Secure checkout. Trusted quality.
        </p>

        <div className="home-buttons">
          {token ? (
            <button
              className="btn-primary"
              onClick={() => navigate("/products")}
            >
              Explore Products
            </button>
          ) : (
            <>
              <Link to="/signup" className="btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
