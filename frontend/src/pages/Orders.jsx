import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/orders/my-orders",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setOrders(res.data);
  };

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹ {order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
