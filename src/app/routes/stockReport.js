import Page from "@jumbo/shared/Page/Page";
import ListStockReport from "app/pages/stockReport/ListStockReport";
import StockReportMiddleware from "./middleware/auth/stockReportMiddleware";

const stockReport = [
  {
    middleware: [
      {
        element: StockReportMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/transfer-order",
        element: (
          <Page component={ListStockReport} layout={"vertical-default"} />
        ),
      },
    ],
  },
];

export default stockReport;
