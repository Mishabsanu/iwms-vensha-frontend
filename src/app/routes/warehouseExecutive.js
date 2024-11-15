import Page from "@jumbo/shared/Page/Page";
import ListProduction from "app/pages/ProductionExecutive/Production/ListProduction";
import AddProduction from "app/pages/ProductionExecutive/Production/AddProduction";
import ProductionRouteMiddleware from "./middleware/auth/productionValidRoute";
import AllocateBinRouteMiddleware from "./middleware/auth/AllocateBinRouteMiddleware";
import ListAllocateBin from "app/pages/BinTable/ListBinTable";
import OutboundRouteMiddleware from "./middleware/auth/outboundRouteMiddleware";
import AddOutbound from "app/pages/WarehouseExecutive/Outbound/AddOutbound";
import ListOutbound from "app/pages/WarehouseExecutive/Outbound/ListOutbound";
import TruckLoadingRouteMiddleware from "./middleware/auth/truckLoadingRouteMiddleware";
import ListTruckLoading from "app/pages/WarehouseExecutive/TruckLoading/ListTruckLoading";
import AddTruckLoading from "app/pages/WarehouseExecutive/TruckLoading/AddTruckLoading";
import ListDelivery from "app/pages/WarehouseExecutive/Delivery/ListDelivery";
import AddDelivery from "app/pages/WarehouseExecutive/Delivery/AddDelivery";
import DeliveryRouteMiddleware from "./middleware/auth/deliveryRouteMiddleware";

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
  {
    middleware: [
      {
        element: TruckLoadingRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/warehouseexecutive/truck-loading",
        element: (
          <Page component={ListTruckLoading} layout={"vertical-default"} />
        ),
      },
      {
        path: "/warehouseexecutive/truck-loading/add",
        element: (
          <Page component={AddTruckLoading} layout={"vertical-default"} />
        ),
      },
      {
        path: "/warehouseexecutive/truck-loading/edit",

        element: (
          <Page component={AddTruckLoading} layout={"vertical-default"} />
        ),
      },
    ],
  },
  {
    middleware: [
      {
        element: DeliveryRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/warehouseexecutive/delivery",
        element: <Page component={ListDelivery} layout={"vertical-default"} />,
      },
      {
        path: "/warehouseexecutive/delivery/add",
        element: <Page component={AddDelivery} layout={"vertical-default"} />,
      },
      {
        path: "/warehouseexecutive/delivery/edit",

        element: <Page component={AddDelivery} layout={"vertical-default"} />,
      },
    ],
  },
];

export default warehouseExecutive;
