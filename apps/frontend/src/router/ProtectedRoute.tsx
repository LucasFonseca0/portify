// src/components/ProtectedRoute.tsx
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStores";

const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
