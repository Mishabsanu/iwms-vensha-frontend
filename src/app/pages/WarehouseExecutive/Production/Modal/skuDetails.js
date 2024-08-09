import React, { useState } from "react";
import Div from "@jumbo/shared/Div";
import {
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Radio,
} from "@mui/material";

export const SkuDetails = ({ open, setOpen, rowData, onSelect }) => {
  const [selectedSku, setSelectedSku] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (item) => {
    setSelectedSku(item);
    onSelect(item);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogContent>
        <Typography variant="h3" color="initial" fontWeight={600}>
          Select
        </Typography>
        <Div>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#202020", color: "white" }}>
                <TableCell sx={{ color: "white", px: 1 }}>Select</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SKU Code</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Storage Type
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Customer Code
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SKU Dec</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SKU Group</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Pallet Qty.
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>Vendor No.</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SUT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData?.map((item) => (
                <TableRow key={item.sku_code} sx={{ bgcolor: "#EDEBEB" }}>
                  <TableCell sx={{ px: 1 }}>
                    <Radio
                      checked={selectedSku?._id === item._id}
                      onChange={() => handleSelect(item)}
                      value={item.sku_code}
                    />
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>{item.sku_code}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.storage_type}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.customer_code}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.sku_description}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.sku_grp}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.pallete_qty}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.vendor_code}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.sut}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Div>
      </DialogContent>
    </Dialog>
  );
};
