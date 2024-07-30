import Page from "@jumbo/shared/Page";
import ListBin from "app/pages/Bin/ListBin";
import AddInbound from "app/pages/Inbound/AddInbound";
import ListInbound from "app/pages/Inbound/ListInbound";
import AddGrade from "app/pages/Master/GradeMaster/AddGrade";
import ListGrade from "app/pages/Master/GradeMaster/ListGrade";
import AddItemCode from "app/pages/Master/ItemCodeMaster/AddItemCode";
import ListItemCode from "app/pages/Master/ItemCodeMaster/ListItemCode";
import AddItemName from "app/pages/Master/ItemNameMaster/AddItemName";
import ListItemName from "app/pages/Master/ItemNameMaster/ListItemName";
import AddMaterial from "app/pages/Master/MaterialMaster/AddMaterial";
import ListMaterial from "app/pages/Master/MaterialMaster/ListMaterial";
import AddParty from "app/pages/Master/PartyMaster/AddParty";
import ListParty from "app/pages/Master/PartyMaster/ListParty";
import AddPallet from "app/pages/Master/ProductionLineMaster/AddProductionLine";
import ListPallet from "app/pages/Master/ProductionLineMaster/ListProductionLine";
import GradeMiddleware from "./middleware/auth/GradeMiddleware";
import InboundMiddleware from "./middleware/auth/InboundMiddleware";
import ItemCodeMiddleware from "./middleware/auth/ItemCodeMiddleware";
import ItemNameMiddleware from "./middleware/auth/ItemNameMiddleware";
import palletMiddleware from "./middleware/auth/PalletMiddleware";
import PartyMiddleware from "./middleware/auth/PartyMiddleware";
import ProductionLineMiddleware from "./middleware/auth/ProductionLineMiddlewarE";
import MaterialRouteMiddleware from "./middleware/auth/materialMasterValidRoute";
import BinRouteMiddleware from "./middleware/auth/unitValidRoute";

export const masterRoutes = [
  {
    middleware: [
      {
        element: MaterialRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/material",
        element: <Page component={ListMaterial} layout={"vertical-default"} />,
      },
      {
        path: "/master/material/add",
        element: <Page component={AddMaterial} layout={"vertical-default"} />,
      },
      {
        path: "/master/material/edit",
        element: <Page component={AddMaterial} layout={"vertical-default"} />,
      },
    ],
  },

  {
    middleware: [
      {
        element: palletMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/pallet",
        element: <Page component={ListPallet} layout={"vertical-default"} />,
      },
      {
        path: "/master/pallet/add",
        element: <Page component={AddPallet} layout={"vertical-default"} />,
      },
      {
        path: "/master/pallet/edit",
        element: <Page component={AddPallet} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: ProductionLineMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/production-line",
        element: <Page component={ListPallet} layout={"vertical-default"} />,
      },
      {
        path: "/master/production-line/add",
        element: <Page component={AddPallet} layout={"vertical-default"} />,
      },
      {
        path: "/master/production-line/edit",
        element: <Page component={AddPallet} layout={"vertical-default"} />,
      },
    ],
  },

  {
    middleware: [
      {
        element: BinRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/bin",
        element: <Page component={ListBin} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: GradeMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/grade",
        element: <Page component={ListGrade} layout={"vertical-default"} />,
      },
      {
        path: "/master/grade/add",
        element: <Page component={AddGrade} layout={"vertical-default"} />,
      },
      {
        path: "/master/grade/edit",
        element: <Page component={AddGrade} layout={"vertical-default"} />,
      },
    ],
  },

  {
    middleware: [
      {
        element: InboundMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/inbound",
        element: <Page component={ListInbound} layout={"vertical-default"} />,
      },
      {
        path: "/master/inbound/add",
        element: <Page component={AddInbound} layout={"vertical-default"} />,
      },
      {
        path: "/master/inbound/edit",
        element: <Page component={AddInbound} layout={"vertical-default"} />,
      },
    ],
  },
  {
    middleware: [
      {
        element: PartyMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/party",
        element: <Page component={ListParty} layout={"vertical-default"} />,
      },
      {
        path: "/master/party/add",
        element: <Page component={AddParty} layout={"vertical-default"} />,
      },
      {
        path: "/master/party/edit",
        element: <Page component={AddParty} layout={"vertical-default"} />,
      },
    ],
  },

  {
    middleware: [
      {
        element: ItemNameMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/item-name",
        element: <Page component={ListItemName} layout={"vertical-default"} />,
      },
      {
        path: "/master/item-name/add",
        element: <Page component={AddItemName} layout={"vertical-default"} />,
      },
      {
        path: "/master/item-name/edit",
        element: <Page component={AddItemName} layout={"vertical-default"} />,
      },
    ],
  },

  {
    middleware: [
      {
        element: ItemCodeMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/master/item-code",
        element: <Page component={ListItemCode} layout={"vertical-default"} />,
      },
      {
        path: "/master/item-code/add",
        element: <Page component={AddItemCode} layout={"vertical-default"} />,
      },
      {
        path: "/master/item-code/edit",
        element: <Page component={AddItemCode} layout={"vertical-default"} />,
      },
    ],
  },
];
