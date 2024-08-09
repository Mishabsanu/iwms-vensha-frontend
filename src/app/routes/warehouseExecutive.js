import Page from "@jumbo/shared/Page/Page";
import ListProduction from "app/pages/WarehouseExecutive/Production/ListProduction";
import AddProduction from "app/pages/WarehouseExecutive/Production/AddProduction";
import ProductionRouteMiddleware from "./middleware/auth/productionValidRoute";
import AllocateBinRouteMiddleware from "./middleware/auth/AllocateBinRouteMiddleware";
import ListAllocateBin from "app/pages/BinTable/ListBinTable";
import OutboundRouteMiddleware from "./middleware/auth/outboundRouteMiddleware";
import AddOutbound from "app/pages/WarehouseExecutive/Outbound/AddOutbound";
import ListOutbound from "app/pages/WarehouseExecutive/Outbound/ListOutbound";

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
  {
    middleware: [
      {
        element: OutboundRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/warehouseexecutive/outbound",
        element: <Page component={ListOutbound} layout={"vertical-default"} />,
      },
      {
        path: "/dashboard/addoutbound",
        element: <Page component={AddOutbound} layout={"vertical-default"} />,
      },
      {
        path: "/dashboard/editoutbound",

        element: <Page component={AddOutbound} layout={"vertical-default"} />,
      },
    ],
  },
];

export default warehouseExecutive;
