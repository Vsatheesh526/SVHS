import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container-page py-20 text-center">Loading…</div>;
  if (!user || user.role !== "admin") return <Navigate to="/admin/login" replace />;
  return children;
}