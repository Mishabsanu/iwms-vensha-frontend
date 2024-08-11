import { Grid } from "@mui/material";
import Cities from "../../../shared/metrics/Cities";
import DealsAnalytics from "../../../shared/metrics/DealsAnalytics";
import Properties from "../../../shared/metrics/Properties";
import QueriesStatistics from "../../../shared/metrics/QueriesStatistics";
import VisitsStatistics from "../../../shared/metrics/VisitsStatistics";

const ListingDashboard = ({ data ,forkliftTaskCount}) => {
  return (
    <Grid container spacing={3.75}>
      <Grid item xs={12} sm={6} lg={3}>
        <Properties data={data} />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Cities data={data} />
      </Grid>
  
      <Grid item xs={12} sm={6} lg={3}>
        <QueriesStatistics data={data} />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <VisitsStatistics data={data} />
      </Grid>
      <Grid item xs={12} md={12}>
        <DealsAnalytics data={forkliftTaskCount} />
      </Grid>
    </Grid>
  );
};

export default ListingDashboard;
