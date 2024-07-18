// PublicRoute.tsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext"; // Adjust path based on your actual AuthContext location

const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Assuming useAuth provides isAuthenticated boolean

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
