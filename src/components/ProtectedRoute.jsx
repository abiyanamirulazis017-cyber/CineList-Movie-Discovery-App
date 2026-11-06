import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

// TAMBAHKAN { allowedRoles } DI DALAM KURUNG FUNGSI
export default function ProtectedRoute({ allowedRoles }) { 
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Sekarang allowedRoles sudah dikenali
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}