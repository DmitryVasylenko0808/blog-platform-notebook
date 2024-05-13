import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const RequireAuth = () => {
  const { isAuthenticated, token } = useAuth();

  if (!isAuthenticated && !token) return <Navigate to="sign-in" />;

  return <Outlet />;
};

export default RequireAuth;
