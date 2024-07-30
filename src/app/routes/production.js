import Page from "@jumbo/shared/Page/Page";
import ListProduction from "app/pages/Production/ListProduction";
import AddProduction from "app/pages/Production/AddProduction";
import ProductionRouteMiddleware from "./middleware/auth/productionValidRoute";

const productionManagementRoutes = [
  {
    middleware: [
      {
        element: ProductionRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/production",
        element: (
          <Page component={ListProduction} layout={"vertical-default"} />
        ),
      },

      {
        path: "/dashboard/addproduction",
        element: <Page component={AddProduction} layout={"vertical-default"} />,
      },
      {
        path: "/dashboard/editproduction",
        element: <Page component={AddProduction} layout={"vertical-default"} />,
      },
    ],
  },
];

export default productionManagementRoutes;
