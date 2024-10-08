import React from "react";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DealsAnalyticsGraph from "./DealsAnalyticsGraph";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import List from "@mui/material/List";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const ListItemInline = styled(ListItem)(({ theme }) => ({
  width: "auto",
  display: "inline-flex",
  padding: theme.spacing(0, 0.5),
}));
const DealsAnalytics = ({ data }) => {
  const { t } = useTranslation();
  return (
    <JumboCardQuick
      title={"Forklift Report"}
      subheader={""}
      action={
        <List disablePadding>
          <ListItemInline>
            <ListItemIcon sx={{ minWidth: 16 }}>
              <FiberManualRecordIcon
                fontSize={"10px"}
                sx={{ color: "#1E88E5" }}
              />
            </ListItemIcon>
            <ListItemText secondary="Pending" />
          </ListItemInline>
          <ListItemInline>
            <ListItemIcon sx={{ minWidth: 16 }}>
              <FiberManualRecordIcon
                fontSize={"10px"}
                sx={{ color: "#E91E63" }}
              />
            </ListItemIcon>
            <ListItemText secondary="Confirm" />
          </ListItemInline>
        </List>
      }
      sx={{
        "& .MuiCardHeader-action": {
          alignSelf: "flex-end",
          mb: -1,
        },
      }}
      wrapperSx={{ pt: 3.75 }}
    >
        
      <DealsAnalyticsGraph data={data} />
    </JumboCardQuick>
  );
};
export default DealsAnalytics;
