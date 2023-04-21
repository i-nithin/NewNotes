import { Navigate } from "react-router-dom";
import { useAuth } from "../../context";

function PrivateRoute({ children }) {
  const { isAuthorized } = useAuth();
  return isAuthorized.status ? children : <Navigate to="/signin" replace />;
}

export { PrivateRoute };
