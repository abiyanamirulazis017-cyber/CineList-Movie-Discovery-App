import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect ke /login, sambil bawa lokasi asal
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Sudah login → render child route
  return <Outlet />;
}