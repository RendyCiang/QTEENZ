import { roleStore } from "@/store/roleStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRoutesProps = {
  allowedRoles: string[];
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles }) => {
  const { role } = roleStore();

  if (!role) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
