import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ roles, children }) => {
  const auth = {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  };
  const userHasRequiredRole = roles.includes(auth.role);

  return auth.token && userHasRequiredRole ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default ProtectedRoutes;
