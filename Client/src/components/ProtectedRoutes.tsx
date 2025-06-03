import { Navigate, Outlet } from "react-router-dom";
import React from "react";

type ProtectedRoutesProps = {
  allowedRoles: (string | null)[];
  notAllowed?: (string | null)[];
  children?: React.ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  allowedRoles,
  notAllowed = [],
  children,
}) => {
  const role =
    localStorage.getItem("role") || sessionStorage.getItem("role") || null;

  // If user has no role and null is not in the allowedRoles, redirect to login
  if (!role && !allowedRoles.includes(null)) {
    return <Navigate to="/login" replace />;
  }

  // If role is defined but not in the allowedRoles, redirect to unauthorized
  if (role && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
