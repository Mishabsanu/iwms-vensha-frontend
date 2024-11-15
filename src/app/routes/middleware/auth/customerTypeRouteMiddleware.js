import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CustomerTypeRouteMiddleware = ({ fallbackPath }) => {
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  if (
    permissions?.customer_type_master_view === true ||
    permissions?.customer_type_master_view === true ||
    permissions?.customer_type_master_view === true
  ) {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default CustomerTypeRouteMiddleware;
