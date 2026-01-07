import { Navigate } from "react-router-dom";
import { getUser } from "../services/auth";

export default function ProtectedRoute({ children }) {
  const user = getUser();
  return user ? children : <Navigate to="/" />;
}
