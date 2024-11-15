import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AllApis from "app/Apis";
import { sendToCrossDock } from "app/services/apis/sendToCrossDock";
import { displayDateFun } from "app/utils/constants/functions";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const OutboundSTODetails = ({ open, setOpen, rowData, onSelect }) => {
  const theme = useTheme();
  const [assignedTo, setAssignedTo] = useState([]);
  const { outbound } = useSelector((state) => state.masterReducer);
  const [transferOrderDialogOpen, setTransferOrderDialogOpen] = useState(false);
  const [personName, setPersonName] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedCrossDock, setSelectedCrossDock] = useState("");
  const [crossDock, setCrossDock] = useState([]);

  const modifyList = outbound.filter(
    (item) => item.sales_transfer_order_no === rowData.sales_transfer_order_no
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    if (value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        assigned_to: "Assigned To is required",
      }));
    } else {
      setErrors((prev) => ({ ...prev, assigned_to: null }));
    }
  };

  const getStyles = (item, selectedItems, theme) => {
    return {
      fontWeight:
        selectedItems.indexOf(item._id) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const crossDockResponse = await Axios.get(
          `${AllApis.dropdownList.crossDockerList}`
        );
        setCrossDock(crossDockResponse.data.result);
        const assignedToResponse = await Axios.get(
          `${AllApis.dropdownList.assignedTo}`
        );
        setAssignedTo(assignedToResponse.data.result);
      } catch (error) {
        console.error("Error fetching dropdown data", error);
      }
    };
    fetchDropdownData();
  }, []);

  const handleTransferOrderOpen = () => {
    if (!selectedCrossDock) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        crossDock: "Cross Dock is required",
      }));
    }

    if (personName.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        assigned_to: "At least one person must be assigned",
      }));
    }
    // If any errors, stop the function
    if (!selectedCrossDock || personName.length === 0) {
      return; // Early exit if validation fails
    }
    setTransferOrderDialogOpen(true);
  };

  const handleDropdownChange = (event) => {
    setSelectedCrossDock(event.target.value);
  };

  const handleTransferOrderClose = () => {
    setTransferOrderDialogOpen(false);
  };

  const handleTransferOrderSelection = async (option) => {
    try {
      const data = {
        modifyList: modifyList,
        assigned_to: personName,
        crossDock: selectedCrossDock,
        orderType: "STO",
      };
      console.log(data, "data");
      await sendToCrossDock(data);
      handleTransferOrderClose();
      handleClose();
    } catch (error) {
      console.error("Error sending Cross Dock Pickup data", error);
    }
    handleTransferOrderClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
        <DialogTitle>
          <IconButton
            edge="end"
            color="error"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#7352C7", color: "white" }}>
                <TableCell sx={{ color: "white", px: 1 }}>Date</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>Order NO</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>Order Type</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SKU Code</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SKU Dec</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SUT</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>Stock Qty</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>Plant Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modifyList?.map((item) =>
                item?.skus.map((row) => (
                  <TableRow key={item?._id} sx={{ bgcolor: "#EDEBEB" }}>
                    <TableCell sx={{ px: 1 }}>
                      {displayDateFun(item?.date)}
                    </TableCell>
                    <TableCell sx={{ px: 1 }}>{item?.sales_order_no}</TableCell>
                    <TableCell sx={{ px: 1 }}>{item?.order_type}</TableCell>
                    <TableCell sx={{ px: 1 }}>{row?.sku_code}</TableCell>
                    <TableCell sx={{ px: 1 }}>{row?.sku_description}</TableCell>
                    <TableCell sx={{ px: 1 }}>{row?.sut}</TableCell>
                    <TableCell sx={{ px: 1 }}>{row?.stock_qty}</TableCell>
                    <TableCell sx={{ px: 1 }}>{item?.plant_name}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <FormControl fullWidth error={Boolean(errors.assigned_to)}>
                <InputLabel id="demo-multiple-name-label">
                  Assigned To
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Assigned To" />}
                  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }} // Custom MenuProps if needed
                >
                  <MenuItem value="Select">Select</MenuItem>
                  {assignedTo.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                      style={getStyles(item, personName, theme)}
                    >
                      {`${item.first_name} ${item.last_name}`}
                    </MenuItem>
                  ))}
                </Select>
                {errors.assigned_to && (
                  <FormHelperText>{errors.assigned_to}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <FormControl fullWidth error={!!errors.crossDock} sx={{ mb: 2 }}>
                <InputLabel>Select Dock</InputLabel>
                <Select
                  value={selectedCrossDock}
                  onChange={handleDropdownChange}
                  label="Select Dock"
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {crossDock.map((dockItem) => (
                    <MenuItem key={dockItem._id} value={dockItem._id}>
                      {dockItem.cross_dock_name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.crossDock && (
                  <FormHelperText>{errors.crossDock}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTransferOrderOpen}
              >
                Create Transfer Order
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        open={transferOrderDialogOpen}
        onClose={handleTransferOrderClose}
        maxWidth="sm"
      >
        <DialogContent>
          <Typography variant="h4" color="initial" fontWeight={600}>
            Transfer Order Type
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => handleTransferOrderSelection("Cross Dock")}
              >
                Cross Dock Pickup
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleTransferOrderSelection("Transfer Order")}
              >
                Manual
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleTransferOrderSelection("Transfer Order")}
              >
                Syatem
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTransferOrderClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
