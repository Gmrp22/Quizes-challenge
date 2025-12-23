import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    // Optionally show a spinner or null while checking auth
    return null;
  }
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
