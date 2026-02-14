import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { token } = useContext(AuthContext);
  const { showToast } = useToast();

  const addToCart = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          quantity: 1
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      showToast("Added to cart", "success");
    } catch (err) {
      showToast("Login required", "error");
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/300x300?text=No+Image";
        }}
      />

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">₹ {product.price}</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
