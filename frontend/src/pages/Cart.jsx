import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState(null);
  const { token } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuantity = async (productId, action) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/cart/update",
        { productId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
    } catch {
      showToast("Error updating quantity", "error");
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/api/cart/remove",
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { productId }
        }
      );
      setCart(res.data);
      showToast("Item removed", "success");
    } catch {
      showToast("Error removing item", "error");
    }
  };

  const getTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce(
      (total, item) =>
        total + item.quantity * (item.product?.price || 0),
      0
    );
  };

  const handleCheckout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      showToast("Payment Successful (Demo Mode)", "success");

      // Refresh cart locally
      setCart({ items: [] });

      // Redirect to orders page
      setTimeout(() => {
        navigate("/orders");
      }, 1200);

    } catch (err) {
      showToast("Checkout failed", "error");
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <p className="empty">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item._id} className="cart-card">
            <div className="cart-info">
              <h4>{item.product?.name}</h4>
              <p>₹ {item.product?.price}</p>
            </div>

            <div className="cart-controls">
              <button onClick={() => updateQuantity(item.product._id, "dec")}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.product._id, "inc")}>+</button>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeItem(item.product._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ₹ {getTotal()}</h3>

        <button
          className="checkout-btn"
          onClick={handleCheckout}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Cart;
