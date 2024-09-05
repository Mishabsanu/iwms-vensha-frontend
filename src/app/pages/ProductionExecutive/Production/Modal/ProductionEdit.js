import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getAllProduction } from "app/redux/actions/masterAction";
import { updateProductionPartialToDelete } from "app/services/apis/updateProductionPartialToDelete";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const ProductionEdit = ({
  open,
  rawData,
  onClose,
  searchTerm,
  sort,
  sortBy,
  page,
  setAddGroup,
  refreshStatusCounts,
}) => {
  const [binNumber, setBinNumber] = useState(rawData?.bin || "");
  const [palletQty, setPalletQty] = useState(rawData?.pallet_qty || "");
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setBinNumber(rawData?.bin || "");
    setPalletQty(rawData?.pallet_qty || "");
  }, [rawData]);

  const handleClose = () => {
    setBinNumber("");
    setPalletQty("");
    onClose();
  };

  const handleSubmit = async () => {
    try {
      const data = {
        bin: binNumber,
        pallet_qty: palletQty,
      };
      const response = await updateProductionPartialToDelete(data, rawData._id);
      if (response.status === 200) {
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Update Successfully",
          timer: 1000,
          showConfirmButton: false,
        });

        dispatch(getAllProduction(searchTerm, sort, sortBy, page, ""));
        await refreshStatusCounts();
        setAddGroup([]);
        handleClose();
      } else {
        handleClose();
        throw new Error(response.data?.message);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: theme.spacing(2),
          width: fullScreen ? "100%" : "600px", // Adjust width for better fit
          maxWidth: "100%",
          height: "auto",
          maxHeight: "80vh", // Restrict height to prevent overflowing
          overflowY: "auto", // Enable vertical scrolling if content overflows
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", paddingBottom: 2 }}>
        Update Details
      </DialogTitle>
      <DialogContent>
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "100%",
            margin: "auto",
            overflowX: "auto", // Horizontal scrolling for small screens
            boxShadow: 3,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#7352C7", color: "white" }}>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  SKU Code
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  SKU Description
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  SUT
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Batch
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Transfer Order No
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ borderBottom: "2px solid #ddd" }}>
                  {rawData?.sku_code || "N/A"}
                </TableCell>
                <TableCell sx={{ borderBottom: "2px solid #ddd" }}>
                  {rawData?.sku_description || "N/A"}
                </TableCell>

                <TableCell sx={{ borderBottom: "2px solid #ddd" }}>
                  {rawData?.sut || "N/A"}
                </TableCell>
                <TableCell sx={{ borderBottom: "2px solid #ddd" }}>
                  {rawData?.batch || "N/A"}
                </TableCell>
                <TableCell sx={{ borderBottom: "2px solid #ddd" }}>
                  {rawData?.transfer_order || "N/A"}
                </TableCell>
                <TableCell sx={{ borderBottom: "2px solid #ddd" }}>
                  {rawData?.status || "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 3,
          }}
        >
          <TextField
            label="Bin Number"
            value={binNumber}
            onChange={(e) => setBinNumber(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Pallet Quantity"
            value={palletQty}
            onChange={(e) => setPalletQty(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            type="number"
            inputProps={{ min: 0 }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingTop: 2 }}>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductionEdit;
