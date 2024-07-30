import React from "react";

import routes from "./routes";
import useJumboRoutes from "@jumbo/hooks/useJumboRoutes";
import NotFound from "./pages/NotFound";
import Page from "@jumbo/shared/Page";

const AppRoutes = () => {
  const appRoutes = useJumboRoutes(routes);

  return (
    <React.Fragment>
      {appRoutes != null ? (
        appRoutes
      ) : (
        <Page component={NotFound} layout={"solo-page"} />
      )}
    </React.Fragment>
  );
};
export default AppRoutes;
