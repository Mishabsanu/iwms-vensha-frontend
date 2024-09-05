import Page from "@jumbo/shared/Page/Page";
import ListForkliftOperator from "app/pages/forkliftOperator/Inbound/ListInforkliftOperator";
import ListForkliftOperatorOutbound from "app/pages/forkliftOperator/Outbound/ListInforkliftOperator";
import ForkliftOperatorMiddleware from "./middleware/auth/forkliftOperatorMiddleware";

const forkliftOperator = [
  {
    middleware: [
      {
        element: ForkliftOperatorMiddleware,
        fallbackPath: "/dashboard",
      },
    ],
    routes: [
      {
        path: "/dashboard/forklift-operator-outbound",
        element: (
          <Page
            component={ListForkliftOperatorOutbound}
            layout={"vertical-default"}
          />
        ),
      },
      {
        path: "/dashboard/forklift-operator-inbound",
        element: (
          <Page component={ListForkliftOperator} layout={"vertical-default"} />
        ),
      },

      //   {
      //     path: "/dashboard/addproduction",
      //     element: <Page component={AddProduction} layout={"vertical-default"} />,
      //   },
      //   {
      //     path: "/dashboard/editproduction",
      //     element: <Page component={AddProduction} layout={"vertical-default"} />,
      //   },
    ],
  },
];

export default forkliftOperator;
