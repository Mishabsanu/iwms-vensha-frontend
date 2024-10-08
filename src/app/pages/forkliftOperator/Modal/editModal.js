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
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getAllForkliftOperator } from "app/redux/actions/masterAction";
import { updateProduction } from "app/services/apis/updateProduction";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const EditBinDetails = ({ open, rawData, onClose }) => {
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
      const response = await updateProduction(data, rawData._id);
      if (response.status === 200) {
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Update Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        dispatch(getAllForkliftOperator("", "desc", "updated_at", 1));
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
      onClose={onClose}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: theme.spacing(2),
          width: fullScreen ? "100%" : "500px",
          maxWidth: "100%",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", paddingBottom: 2 }}>
        Update Bin Details
      </DialogTitle>
      <DialogContent>
        {/* Top Section for Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>SKU Code</TableCell>
                <TableCell>{rawData?.sku_code || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Batch</TableCell>
                <TableCell>{rawData?.batch || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>{rawData?.status || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Bottom Section for Editable Inputs */}
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 3, // Add some space between the table and inputs
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
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBinDetails;
