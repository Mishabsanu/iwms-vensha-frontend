import { Navigate, Outlet } from "react-router-dom";

const MyRouteMiddleware = ({ fallbackPath }) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  // console.log(isAuthenticated);
  if (isAuthenticated === "true") {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default MyRouteMiddleware;
