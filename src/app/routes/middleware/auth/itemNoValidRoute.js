import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// const ItemNoValidRoute = ({ fallbackPath }) => {
     const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );;

//     if (permissions?.item_master_view === true) {
//         return <Outlet />;
//     } else {
//         return <Navigate to={fallbackPath} />;
//     }
// };

// export default ItemNoValidRoute;
const ItemNoValidRoute = () => {



    return <Outlet />;

};

export default ItemNoValidRoute;