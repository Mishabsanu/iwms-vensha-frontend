import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UnLoadingRouteMiddleware = ({ fallbackPath }) => {
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  if (
    permissions.unloading_master_create === true ||
    permissions.unloading_master_edit === true ||
    permissions.unloading_master_view === true
  ) {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default UnLoadingRouteMiddleware;
