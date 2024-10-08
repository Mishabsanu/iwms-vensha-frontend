import Page from "@jumbo/shared/Page/Page";
import ListInbound from "app/pages/GateEntry/Inbound/ListInbound";
import AddInbound from "app/pages/GateEntry/Inbound/AddInbound";
import GateEntryRouteMiddleware from "./middleware/auth/gateEntryValidRoute";
import ListOutbound from "app/pages/GateEntry/outbound/Listoutbound";
import AddOutbound from "app/pages/GateEntry/outbound/Addoutbound";

const gateEntryReport = [
  {
    middleware: [
      {
        element: GateEntryRouteMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/gate-entry-inbound",
        element: <Page component={ListInbound} layout={"vertical-default"} />,
      },
      {
        path: "/gate-entry-inbound/add",
        element: <Page component={AddInbound} layout={"vertical-default"} />,
      },
      {
        path: "/gate-entry-inbound/edit",
        element: <Page component={AddInbound} layout={"vertical-default"} />,
      },

      {
        path: "/dashboard/gate-entry-outbound",
        element: <Page component={ListOutbound} layout={"vertical-default"} />,
      },
      {
        path: "/gate-entry-outbound/add",
        element: <Page component={AddOutbound} layout={"vertical-default"} />,
      },
      {
        path: "/gate-entry-outbound/edit",
        element: <Page component={AddOutbound} layout={"vertical-default"} />,
      },
    ],
  },
];

export default gateEntryReport;
