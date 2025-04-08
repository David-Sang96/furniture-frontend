import useAuthStore from "@/store/authStore";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const phone = useAuthStore((store) => store.phone);
  const token = useAuthStore((store) => store.token);

  const isLoggedIn = !!phone && !!token;

  if (!isLoggedIn) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
