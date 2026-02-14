import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, category, sort, products]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterProducts = () => {
    let temp = [...products];

    // Search
    if (search) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "All") {
      temp = temp.filter((p) => p.category === category);
    }

    // Sorting
    if (sort === "low") {
      temp.sort((a, b) => a.price - b.price);
    }
    if (sort === "high") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(temp);
  };

  const categories = ["All", ...new Set(products.map(p => p.category))];

  return (
    <div className="products-page">
      <h2 className="products-title">Our Products</h2>

      {/* FILTER SECTION */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <h3 className="no-products">No products found</h3>
        )}
      </div>
    </div>
  );
}

export default Products;
