import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuomMiddleware = ({ fallbackPath }) => {
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  if (
    permissions?.auom_master_view === true ||
    permissions.auom_master_edit === true ||
    permissions.auom_master_create === true
  ) {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default AuomMiddleware;
