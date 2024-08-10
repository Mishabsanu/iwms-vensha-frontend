import Page from "@jumbo/shared/Page/Page";
import ChangePassword from "app/pages/ChangePassword";
import ConfigureRole from "app/pages/RoleManagement/ConfigureRole";
import ListRole from "app/pages/RoleManagement/ListRole";
import AddUser from "app/pages/UserManagement/AddUser";
import ListUser from "app/pages/UserManagement/ListUser";
import RoleMngtRouteMiddleware from "./middleware/auth/roleMngtValidRoute";
import UserRouteMiddleware from "./middleware/auth/userValidRoute";

const userManagementRoutes = [
  {
    middleware: [
      {
        element: UserRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/user",
        element: <Page component={ListUser} layout={"vertical-default"} />,
      },

      {
        path: "/dashboard/adduser",
        element: <Page component={AddUser} layout={"vertical-default"} />,
      },
      {
        path: "/dashboard/edituser",
        element: <Page component={AddUser} layout={"vertical-default"} />,
      },
      {
        path: "/changepassword",
        element: (
          <Page component={ChangePassword} layout={"vertical-default"} />
        ),
      },
    ],
  },
  {
    middleware: [
      {
        element: RoleMngtRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/roles",
        element: <Page component={ListRole} layout={"vertical-default"} />,
      },
      {
        path: "/dashboard/addrole",
        element: <Page component={ConfigureRole} layout={"vertical-default"} />,
      },
      {
        path: "/dashboard/editrole",
        element: <Page component={ConfigureRole} layout={"vertical-default"} />,
      },
    ],
  },

  

  //   {
  //     path: "/manage/users",
  //     element: <Page component={UsersList} layout={"vertical-default"} />,
  //   },
  //   {
  //     path: "/add/user",
  //     element: <Page component={AddUser} layout={"vertical-default"} />,
  //   },
];

export default userManagementRoutes;
