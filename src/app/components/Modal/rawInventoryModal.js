import Div from "@jumbo/shared/Div";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import { PattasTable } from "./pattasTable";

export const RawInventoryModal = ({ open, setOpen, rowData, tab }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth>
      {/* <Div
        sx={{
          display: "flex",
          minWidth: 600,
        }}
      >
        <DialogTitle sx={{ fontWeight: "700" }}>
          <Div>
            <Typography variant="h3" color="initial" fontWeight={600}>
              Item Details:-
            </Typography>
          </Div>
        </DialogTitle>
      </Div> */}
      <DialogContent>
        <Div sx={{mb:2}}>
          <Typography variant="h3" color="initial" fontWeight={600}>
            Item Details
          </Typography>
        </Div>
        <Div
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 3,
            "& > *":{
              width:"100%"
            }
          }}
        >
          <PattasTable
            data={rowData.item_received_quantities}
            heading={"Received Quantity"}
          />
          {tab !== "History" && (
            <>
              <PattasTable
                data={rowData.item_available_quantities}
                heading={"Available Quantity"}
              />
              <PattasTable
                data={rowData.item_rejected_quantities}
                heading={"Rejected Quantity"}
              />
            </>
          )}
        </Div>
      </DialogContent>
    </Dialog>
  );
};
