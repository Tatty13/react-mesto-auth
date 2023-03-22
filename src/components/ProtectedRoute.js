import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  return props.isloggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}

export default ProtectedRoute;
