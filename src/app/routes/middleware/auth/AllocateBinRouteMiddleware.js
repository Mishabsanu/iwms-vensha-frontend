import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AllocateBinRouteMiddleware = ({ fallbackPath }) => {
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  if (permissions?.bin_master_view=== true) {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default AllocateBinRouteMiddleware;
