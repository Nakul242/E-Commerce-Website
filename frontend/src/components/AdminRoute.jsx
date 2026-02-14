import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== "admin") {
      return <Navigate to="/" />;
    }

  } catch (err) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;
