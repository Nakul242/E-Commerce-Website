import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to ShopSphere</h1>
        <p>
          Discover premium products at unbeatable prices. 
          Fast delivery. Secure payments. Trusted quality.
        </p>

        <div className="home-buttons">
          <Link to="/signup" className="btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
