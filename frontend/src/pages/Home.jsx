import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Home() {

  const [products, setProducts] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Added to cart!");

    } catch (err) {
      alert("Login required");
    }
  };

  return (
    <div>
      <h2>Products</h2>

      {products.map((product) => (
        <div key={product._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ₹{product.price}</p>
          <button onClick={() => addToCart(product._id)}>
            Add to Cart
          </button>
        </div>
      ))}

    </div>
  );
}

export default Home;
