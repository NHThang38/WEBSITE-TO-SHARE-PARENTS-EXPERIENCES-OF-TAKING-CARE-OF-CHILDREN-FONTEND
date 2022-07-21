
import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import NotFound from "../NotFound";

const RequireAdmin = () => {
  const { auth } = useAuth();
  return auth?.user?.role === "admin" ? <Outlet /> : <NotFound />;
};

export default RequireAdmin;
