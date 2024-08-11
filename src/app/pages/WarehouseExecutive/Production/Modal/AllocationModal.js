import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { getAllProduction } from "app/redux/actions/masterAction";
import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const AllocationModal = ({
  open,
  onClose,
  unallocatedItems,
  searchTerm,
  sort,
  sortBy,
  page,
  setAddGroup,
  refreshStatusCounts,
}) => {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Reset items state when modal opens or unallocatedItems changes
  useEffect(() => {
    if (open) {
      setItems(
        unallocatedItems.reduce(
          (acc, item) => ({
            ...acc,
            [item.production_id]: "",
          }),
          {}
        )
      );
    }
  }, [open, unallocatedItems]);

  const resetItems = useCallback(() => {
    setItems(
      unallocatedItems.reduce(
        (acc, item) => ({
          ...acc,
          [item.production_id]: "",
        }),
        {}
      )
    );
  }, [unallocatedItems]);

  const handleInputChange = (productionId, event) => {
    setItems((prevItems) => ({
      ...prevItems,
      [productionId]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    // Validate that all bin numbers are provided
    if (Object.values(items).some((binNumber) => !binNumber.trim())) {
      Swal.fire({
        title: "Error!",
        text: "Please enter bin numbers for all items.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = Object.keys(items).map((productionId) => ({
        productionId,
        binNumber: items[productionId],
      }));

      console.log(payload, "payload");

      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/production/bin-overflow-allocate`,
        { items: payload },
        config
      );

      if (response.status === 200 || response.status === 201) {
        dispatch(getAllProduction(searchTerm, sort, sortBy, page, ""));
        await refreshStatusCounts();
        setAddGroup([]);
        handleClose();
        Swal.fire({
          title: "Success!",
          text: "Bin Allocated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Error submitting data.");
        Swal.fire({
          title: "Error!",
          text: "Failed to allocate bins. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while allocating bins.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    console.log("Closing modal with items:", items);
    resetItems();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 2,
          maxWidth: 600,
          mx: "auto",
          mt: "10%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          position: "relative",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
          Bin Overflow Please Enter Bin No
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#7352C7", color: "white" }}>
                <TableCell sx={{ color: "white", px: 1, width: "30%" }}>
                  <Typography variant="subtitle1">SKU Code</Typography>
                </TableCell>
                <TableCell sx={{ color: "white", px: 1, width: "20%" }}>
                  <Typography variant="subtitle1">Transfer Order</Typography>
                </TableCell>
                <TableCell sx={{ color: "white", px: 1, width: "50%" }}>
                  <Typography variant="subtitle1">Bin Number</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unallocatedItems.map((item) => (
                <TableRow key={item.production_id}>
                  <TableCell sx={{ width: "30%" }}>{item.sku_code}</TableCell>
                  <TableCell sx={{ width: "20%" }}>{item.transfer_order}</TableCell>
                  <TableCell sx={{ width: "50%" }}>
                    <TextField
                      label="Bin Number"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={items[item.production_id] || ""}
                      onChange={(e) => handleInputChange(item.production_id, e)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AllocationModal;
