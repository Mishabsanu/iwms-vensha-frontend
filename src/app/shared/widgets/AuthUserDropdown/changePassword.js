import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ChangePasswordModal = ({ open, onClose }) => {
  const [inputs, setInputs] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.userReducer);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onPasswordChange = async () => {
    try {
      setLoader(true);
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };

      const data = await axios.patch(
        `${process.env.REACT_APP_URL}/profile/change-password?id=${user?.id}`,
        { ...inputs },
        config
      );
      if (data?.status == 200) {
        Swal.fire({ icon: "success", title: "Password Changed" });
        onClose();
      }
    } catch (error) {
      console.log(error.response);
      setError(error?.response?.data?.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} width={500}>
      <DialogTitle sx={{ fontWeight: "700" }}>Change Password</DialogTitle>
      <DialogContent>
        <Typography
          variant="h5"
          color={"error"}
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {error}
        </Typography>
        <Div>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Old Password
          </Typography>
          <TextField
            size="small"
            type="password"
            name="old_password"
            onChange={handleChange}
          ></TextField>
        </Div>
        <Div sx={{ mt: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            New Password
          </Typography>
          <TextField
            size="small"
            type="password"
            name="new_password"
            onChange={handleChange}
          ></TextField>
        </Div>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={onPasswordChange}
          loading={loader}
        >
          Change
        </LoadingButton>
        <Button variant="contained" color="error" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
