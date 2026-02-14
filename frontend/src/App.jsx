import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastProvider } from "./context/ToastContext";
import Products from "./pages/Products";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Orders from "./pages/Orders";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="app-layout">
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
              <Route path="/admin" element={<AdminRoute> <AdminDashboard /> </AdminRoute>} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
