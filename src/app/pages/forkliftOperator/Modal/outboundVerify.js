import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { verifyBin } from "app/services/apis/verifyBin";
import { useDispatch } from "react-redux";
import { getAllForkliftOperator } from "app/redux/actions/masterAction";
import { verifyBinoutbound } from "app/services/apis/verifyBinoutbound";

const OutboundVerify = ({ open, onClose, rawData }) => {
  const [digit_3_codes, setDigit_3_codes] = useState("");
  const [errors, setErrors] = useState({ digit_3_codes: "" });
  const dispatch = useDispatch();

  const handleClose = () => {
    setDigit_3_codes(""); // Reset the input on close
    setErrors({ digit_3_codes: "" }); // Reset errors on close
    onClose();
  };

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!digit_3_codes.trim()) {
      errors.digit_3_codes = "3 Digit Code is required";
      isValid = false;
    } else if (digit_3_codes.trim().length !== 3) {
      errors.digit_3_codes = "3 Digit Code must be exactly 3 characters";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return; // Stop if validation fails

    try {
      const data = {
        digit_3_codes: digit_3_codes,
        _id: rawData._id,
      };
      const response = await verifyBinoutbound(data);
      if (response.status === 200) {
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Verified Successfully",
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
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)", // Adjust blur effect
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust transparency
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: 500 },
          bgcolor: "white", // Solid background for modal content
          borderRadius: 2,
          position: "relative",
          boxShadow: 24,
          p: 3, // Padding for the entire modal
        }}
      >
        {/* Header Section with Close Button */}
        <Box
          sx={{
            bgcolor: "#1976d2",
            p: 2,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            position: "relative",
          }}
        >
          <Typography variant="h6" color="white">
            Out Away
          </Typography>
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Details Section */}
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                <strong>SKU Code:</strong> {rawData?.sku_code}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2">
                <strong>Batch:</strong> {rawData?.batch}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                <strong>Order Qty:</strong> {rawData?.order_qty}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                <strong>Bin No:</strong> {rawData?.bin}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Input Section */}
        <Box sx={{ pt: 2 }}>
          <TextField
            label="3 Digit Code"
            fullWidth
            required
            value={digit_3_codes}
            onChange={(e) => setDigit_3_codes(e.target.value)}
            error={!!errors.digit_3_codes}
            helperText={errors.digit_3_codes}
            inputProps={{ maxLength: 3 }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default OutboundVerify;
