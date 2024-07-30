import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserRouteMiddleware = ({ fallbackPath }) => {
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  if (permissions?.user_view === true) {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default UserRouteMiddleware;
