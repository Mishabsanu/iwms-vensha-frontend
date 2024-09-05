import Page from "@jumbo/shared/Page/Page";
import TransferOrderMiddleware from "./middleware/auth/transferOrderMiddleware";
import ListTransferOrderOutbound from "app/pages/TransferOrder/Outbound/ListTransferOrder";
import ListTransferOrderInbound from "app/pages/TransferOrder/inbound/ListTransferOrder";

const transaction = [
  {
    middleware: [
      {
        element: TransferOrderMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/transfer-order-inbound",
        element: (
          <Page
            component={ListTransferOrderInbound}
            layout={"vertical-default"}
          />
        ),
      },
      {
        path: "/dashboard/transfer-order-outbound",
        element: (
          <Page
            component={ListTransferOrderOutbound}
            layout={"vertical-default"}
          />
        ),
      },
    ],
  },
];

export default transaction;
