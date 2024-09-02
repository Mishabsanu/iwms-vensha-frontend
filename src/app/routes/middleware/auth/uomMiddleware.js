import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UomMiddleware = ({ fallbackPath }) => {
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  if (
    permissions?.uom_master_view === true ||
    permissions.uom_master_edit === true ||
    permissions.uom_master_create === true
  ) {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default UomMiddleware;
