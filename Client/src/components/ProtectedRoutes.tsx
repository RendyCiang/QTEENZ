import { roleStore } from "@/store/roleStore";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRoutesProps = {
  allowedRoles: string[];
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles }) => {
  // const { role, loadRole, loading } = roleStore();
  // useEffect(() => {
  //   loadRole();
  // }, []);
  // if (loading) {
  //   setTimeout(() => {}, 1000);
  // }

  const role = localStorage.getItem("role")
    ? localStorage.getItem("role")
    : sessionStorage.getItem("role");
  console.log(role);
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
