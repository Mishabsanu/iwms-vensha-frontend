import Page from "@jumbo/shared/Page";
import Login from "app/pages/login";
import MyRouteMiddleware from "./middleware/auth/authValidRoute";

import Dashboard from "app/pages/Dashboard";
import ForgotPassword from "app/pages/ForgotPassword";
import PasswordOtp from "app/pages/Otp";
import EditUserProfile from "app/pages/UserManagement/Edit Profile";
import { masterRoutes } from "./masterRoutes";
import userManagementRoutes from "./userManagementRoutes";
import warehouseExecutive from "./warehouseExecutive";
import forkliftOperator from "./forkliftOperator";

/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
// const {isAuthenticated}
const routesForPublic = [
  {
    path: "/",
    element: <Page component={Login} layout={"solo-page"} />,
  },
  {
    path: "/user/login",
    element: <Page component={Login} layout={"solo-page"} />,
  },
  {
    path: "/password/reset",
    element: <Page component={ForgotPassword} layout={"solo-page"} />,
  },
  {
    path: "/password/otp",
    element: <Page component={PasswordOtp} layout={"solo-page"} />,
  },
  {
    middleware: [
      {
        element: MyRouteMiddleware,
        fallbackPath: "/user/login",
      },
    ],
    routes: [
      {
        path: "/profile",
        element: (
          <Page component={EditUserProfile} layout={"vertical-default"} />
        ),
      },
      {
        path: "/dashboard",
        element: <Page component={Dashboard} layout={"vertical-default"} />,
      },
      ...userManagementRoutes,
      ...masterRoutes,
      ...warehouseExecutive,
      ...forkliftOperator,
    ],
  },
];
// {
//   path: "/",
//   element: <Page component={Home} layout={"vertical-default"} />,
// },
// {
//   middleware: [
//     {
//       element: MyRouteMiddleware,
//       fallbackPath: "/user/login",
//     },
//   ],
//   routes: [...dashboardRoutes],
// },
/**
 routes only accessible to authenticated users
 **/
const routesForAuthenticatedOnly = [];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [
  // {
  //   path: "/user/login",
  //   element: (
  //     <Page component={Login} layout={"solo-page"} disableSmLogin={true} />
  //   ),
  // },
];

const routes = [
  ...routesForPublic,
  ...routesForAuthenticatedOnly,
  ...routesForNotAuthenticatedOnly,
];

export {
  routes as default,
  routesForAuthenticatedOnly,
  routesForNotAuthenticatedOnly,
  routesForPublic
};

