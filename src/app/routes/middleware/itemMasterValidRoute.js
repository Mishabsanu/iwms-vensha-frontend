import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ItemsRouteMiddleware = ({ fallbackPath }) => {
   const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );;

  if (permissions?.item_master_view === true) {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default ItemsRouteMiddleware;
