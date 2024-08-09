import Page from "@jumbo/shared/Page/Page";
import ListTransferOrder from "app/pages/transferOrder/ListTransferOrder";
import TransferOrderMiddleware from "./middleware/auth/transferOrderMiddleware";

const trasnferOrder = [
  {
    middleware: [
      {
        element: TransferOrderMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/transfer-order",
        element: (
          <Page component={ListTransferOrder} layout={"vertical-default"} />
        ),
      },
    ],
  },
];

export default trasnferOrder;
