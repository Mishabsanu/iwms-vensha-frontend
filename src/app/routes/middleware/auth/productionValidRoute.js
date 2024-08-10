import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProductionRouteMiddleware = ({ fallbackPath }) => {
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  if (
    permissions.production_master_view === true ||
    permissions.production_master_edit === true ||
    permissions.production_master_create === true
 )
     {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default ProductionRouteMiddleware;
