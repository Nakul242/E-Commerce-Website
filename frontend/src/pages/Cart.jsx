import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Cart() {

  const [cart, setCart] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/cart",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setCart(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, [token]);

  const placeOrder = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Order placed successfully!");
        setCart(null);
    } 
    catch (err) {
        console.log(err);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {!cart || cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item._id}>
              <p>{item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}

          <button onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
