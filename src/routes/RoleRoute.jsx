import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ allowedRoles = [] }) {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();
  const allowed = allowedRoles.map((item) => item.toLowerCase());

  if (!role || !allowed.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
