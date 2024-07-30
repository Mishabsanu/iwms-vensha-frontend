import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const GstRouteMiddleware = ({ fallbackPath }) => {
   const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );;

  if (
    permissions.gst_master_create === true ||
    permissions.gst_master_edit === true ||
    permissions.gst_master_view === true
  ) {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default GstRouteMiddleware;
