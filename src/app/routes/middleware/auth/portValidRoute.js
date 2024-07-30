import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PortRouteMiddleware = ({ fallbackPath }) => {
   const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );;

  if (
    permissions.port_master_create === true ||
    permissions.port_master_edit === true ||
    permissions.port_master_view === true
  ) {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default PortRouteMiddleware;
