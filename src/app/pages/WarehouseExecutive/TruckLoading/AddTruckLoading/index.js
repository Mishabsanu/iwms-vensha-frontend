import Div from "@jumbo/shared/Div/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addTruckLoading } from "app/services/apis/addTruckLoading";
import { updateTruckLoading } from "app/services/apis/updateTruckLoading";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddTruckLoading() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [truckType, setTruckType] = useState([
    { _id: 1, truck_type: "16 tonner" },
    { _id: 2, truck_type: "9 tonner" },
    { _id: 3, truck_type: "Tata Ace" },
    { _id: 4, truck_type: "3 wheeler" },
  ]);

  const [isSubmitting, setSubmitting] = useState(false);
  const { pathname } = useLocation();
  const data = state;

  const user = {
    date: data?.date || null,
    trip_number: data?.trip_number || "",
    truck_number: data?.truck_number || "",
    truck_type: data?.truck_type || "",
    transporter_name: data?.transporter_name || "",
    trip_sheet_number: data?.trip_sheet_number || "",
    actual_weight: data?.actual_weight || "",
    gross_weight: data?.gross_weight || "",
  };

  const validationSchema = yup.object({
    date: yup.string().required("Date is required"),
    trip_number: yup.string().required("Trip Number is required"),
    truck_number: yup.string().required("Truck Number is required"),
    truck_type: yup
      .string()
      .required("Truck Type is required")
      .test(
        "truck-type-not-select",
        "Please select a valid Truck Type",
        (value) => value !== "Select"
      ),
    // transporter_name: yup
    //   .string()
    //   .required("Vendor is required")
    //   .test(
    //     "vendor-not-select",
    //     "Please select a valid Vendor",
    //     (value) => value !== "Select"
    //   ),

    transporter_name: yup.string().required("Transporter Name is required"),
    trip_sheet_number: yup.string().required("Trip sheet number is required"),
    actual_weight: yup.number().required("Actual weight is required"),
    gross_weight: yup.number().required("Gross weightis required"),
  });

  const onUserSave = async (values) => {
    setSubmitting(true);
    try {
      if (pathname === "/warehouseexecutive/truck-loading/edit") {
        const response = await updateTruckLoading({
          ...values,
          id: state._id,
        });
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Truck Loading Edited Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate("/dashboard/warehouseexecutive/truck-loading");
        } else {
          throw new Error(response.message);
        }
      } else {
        const response = await addTruckLoading(values);
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Truck Loading Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate("/dashboard/warehouseexecutive/truck-loading");
        } else {
          throw new Error(response.data?.message);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
    setSubmitting(false);
  };

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname === "/warehouseexecutive/truck-loading/add"
          ? "Add New Truck Loading"
          : "Edit Truck Loading "}
      </Typography>
      <Div>
        <Formik
          initialValues={user}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onUserSave}
        >
          {({ setFieldValue, values, errors }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={2} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date"
                        name="date"
                        value={values.date ? dayjs(values.date) : null}
                        onChange={(date) =>
                          setFieldValue("date", date ? date.toISOString() : "")
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              style: { width: "100%" },
                            }}
                            sx={{
                              width: "100%", // Ensure the TextField takes full width
                              "& .MuiInputBase-root": {
                                width: "100%", // Ensure the inner input element takes full width
                              },
                            }}
                          />
                        )}
                        sx={{ width: "100%" }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Trip Number *"
                        name="trip_number"
                        value={values.trip_number}
                        onChange={(e) =>
                          setFieldValue("trip_number", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.trip_number)}
                        helperText={errors.trip_number}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Trip Sheet Number *"
                        name="trip_sheet_number"
                        value={values.trip_sheet_number}
                        onChange={(e) =>
                          setFieldValue("trip_sheet_number", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.trip_sheet_number)}
                        helperText={errors.trip_sheet_number}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Truck Number *"
                        name="truck_number"
                        value={values.truck_number}
                        onChange={(e) =>
                          setFieldValue("truck_number", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.truck_number)}
                        helperText={errors.truck_number}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Truck Type *"
                        name="truck_type"
                        value={values.truck_type}
                        onChange={(e) =>
                          setFieldValue("truck_type", e.target.value)
                        }
                        select
                        fullWidth
                        error={Boolean(errors.truck_type)}
                        helperText={errors.truck_type}
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {truckType.map((item) => (
                          <MenuItem key={item._id} value={item.truck_type}>
                            {item.truck_type}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Transporter Name *"
                        name="transporter_name"
                        value={values.transporter_name}
                        onChange={(e) =>
                          setFieldValue("transporter_name", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.transporter_name)}
                        helperText={errors.transporter_name}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Gross Weight *"
                        name="gross_weight"
                        value={values.gross_weight}
                        onChange={(e) =>
                          setFieldValue("gross_weight", e.target.value)
                        }
                        fullWidth
                        type="number"
                        error={Boolean(errors.gross_weight)}
                        helperText={errors.gross_weight}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Actual Weight *"
                        name="actual_weight"
                        type="number"
                        value={values.actual_weight}
                        onChange={(e) =>
                          setFieldValue("actual_weight", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.actual_weight)}
                        helperText={errors.actual_weight}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Div>

              <Div
                sx={{
                  width: "93.5%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  mt: 3,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/dashboard/user")}
                >
                  Cancel
                </Button>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  sx={{ width: "100px" }}
                  loading={isSubmitting}
                >
                  Save
                </LoadingButton>
              </Div>
            </Form>
          )}
        </Formik>
      </Div>
    </Div>
  );
}
