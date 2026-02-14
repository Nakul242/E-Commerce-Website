import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/products"
    );
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/products/${id}`
    );
    fetchProducts();
  };

  const handleStockUpdate = async (id, stock) => {
    await axios.put(
      `http://localhost:5000/api/products/${id}/stock`,
      { stock }
    );
    fetchProducts();
  };

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/products",
      newProduct
    );

    setNewProduct({
      name: "",
      price: "",
      category: "",
      stock: "",
      image: ""
    });

    fetchProducts();
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>

      <form className="add-product-form" onSubmit={handleAddProduct}>
        <input name="name" placeholder="Name" value={newProduct.name} onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" value={newProduct.price} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} required />
        <input name="stock" placeholder="Stock" type="number" value={newProduct.stock} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={newProduct.image} onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹ {p.price}</td>
              <td>
                <input
                  type="number"
                  value={p.stock}
                  onChange={(e) =>
                    handleStockUpdate(p._id, e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleDelete(p._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
