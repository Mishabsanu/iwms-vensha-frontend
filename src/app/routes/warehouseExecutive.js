import Page from "@jumbo/shared/Page/Page";
import ListProduction from "app/pages/WarehouseExecutive/Production/ListProduction";
import AddProduction from "app/pages/WarehouseExecutive/Production/AddProduction";
import ProductionRouteMiddleware from "./middleware/auth/productionValidRoute";
import AllocateBinRouteMiddleware from "./middleware/auth/AllocateBinRouteMiddleware";
import ListAllocateBin from "app/pages/BinTable/ListBinTable";

const warehouseExecutive = [
  {
    middleware: [
      {
        element: ProductionRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/warehouseexecutive/production",
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
  {
    middleware: [
      {
        element: AllocateBinRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/warehouseexecutive/bin",
        element: (
          <Page component={ListAllocateBin} layout={"vertical-default"} />
        ),
      },
    ],
  },
];

export default warehouseExecutive;
