/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("adminToken"); // Check if admin token exists

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
