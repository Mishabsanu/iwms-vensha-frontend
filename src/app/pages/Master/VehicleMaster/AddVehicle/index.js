import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addVehicle } from "app/services/apis/addVehicle";
import { updateVehicle } from "app/services/apis/updateVehicle";
import dayjs from "dayjs";
// Assuming these APIs exist for vehicles
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddVehicle() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);

  // Initialize the vehicle object with default or state values
  const vehicle = {
    vehicle_number: state?.vehicle_number || "",
    vehicle_type: state?.vehicle_type || "",
    make: state?.make || "",
    model: state?.model || "",
    year_of_manufacture: state?.year_of_manufacture || "",
    registration_number: state?.registration_number || "",
    registration_date: state?.registration_date || "",
    fitness_certificate_number: state?.fitness_certificate_number || "",
    fitness_certificate_date: state?.fitness_certificate_date || "",
    additional_fields: state?.additional_fields || "",
    vehicle_capacity: state?.vehicle_capacity || "",
    vehicle_owner: state?.vehicle_owner || "",
    vehicle_insurance_number: state?.vehicle_insurance_number || "",
    vehicle_insurance_date: state?.vehicle_insurance_date || "",
  };

  // Validation schema using yup
  const validationSchema = yup.object({
    vehicle_number: yup
      .string("Enter Vehicle Number")
      .required("Vehicle Number is required"),
    vehicle_type: yup
      .string("Enter Vehicle Type")
      .required("Vehicle Type is required"),
    make: yup.string("Enter Make").required("Make is required"),
    model: yup.string("Enter Model").required("Model is required"),
    year_of_manufacture: yup
      .number("Enter Year of Manufacture")
      .required("Year of Manufacture is required"),
    registration_number: yup
      .string("Enter Registration Number")
      .required("Registration Number is required"),
    registration_date: yup
      .date("Enter Registration Date")
      .required("Registration Date is required"),
    fitness_certificate_number: yup
      .string("Enter Fitness Certificate Number")
      .required("Fitness Certificate Number is required"),
    fitness_certificate_date: yup
      .date("Enter Fitness Certificate Date")
      .required("Fitness Certificate Date is required"),
    vehicle_capacity: yup
      .string("Enter Vehicle Capacity")
      .required("Vehicle Capacity is required"),
    vehicle_owner: yup
      .string("Enter Vehicle Owner")
      .required("Vehicle Owner is required"),
    vehicle_insurance_number: yup
      .string("Enter Vehicle Insurance Number")
      .required("Vehicle Insurance Number is required"),
    vehicle_insurance_date: yup
      .date("Enter Vehicle Insurance Date")
      .required("Vehicle Insurance Date is required"),
  });

  // Function to handle form submission
  const onVehicleSave = async (values) => {
    const body = { ...values };
    setSubmitting(true);
    if (pathname === "/master/vehicle/edit") {
      const data = await updateVehicle(body, state._id); // Replace with actual update API call
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Vehicle Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/vehicle");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addVehicle(body); // Replace with actual add API call
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Vehicle Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/vehicle");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.data?.message,
          text: "",
        });
      }
    }
    setSubmitting(false);
  };

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname === "/master/vehicle/add"
          ? "Add New Vehicle"
          : "Edit Vehicle"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={vehicle}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onVehicleSave}
        >
          {({ values, setFieldValue, errors }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Div
                  sx={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    columnGap: 5,
                  }}
                >
                  <Grid container rowSpacing={3} columnSpacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={errors.vehicle_number}
                          helperText={errors.vehicle_number}
                          label="Vehicle Number*"
                          name="vehicle_number"
                          value={values.vehicle_number}
                          onChange={(e) =>
                            setFieldValue("vehicle_number", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={errors.vehicle_type}
                          helperText={errors.vehicle_type}
                          label="Vehicle Type*"
                          name="vehicle_type"
                          value={values.vehicle_type}
                          onChange={(e) =>
                            setFieldValue("vehicle_type", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={errors.make}
                          helperText={errors.make}
                          label="Make*"
                          name="make"
                          value={values.make}
                          onChange={(e) =>
                            setFieldValue("make", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={errors.model}
                          helperText={errors.model}
                          label="Model*"
                          name="model"
                          value={values.model}
                          onChange={(e) =>
                            setFieldValue("model", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={errors.year_of_manufacture}
                          helperText={errors.year_of_manufacture}
                          label="Year of Manufacture*"
                          name="year_of_manufacture"
                          value={values.year_of_manufacture}
                          onChange={(e) =>
                            setFieldValue("year_of_manufacture", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={errors.registration_number}
                          helperText={errors.registration_number}
                          label="Registration Number*"
                          name="registration_number"
                          value={values.registration_number}
                          onChange={(e) =>
                            setFieldValue("registration_number", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={errors.fitness_certificate_number}
                          helperText={errors.fitness_certificate_number}
                          label="Fitness Certificate Number*"
                          name="fitness_certificate_number"
                          value={values.fitness_certificate_number}
                          onChange={(e) =>
                            setFieldValue(
                              "fitness_certificate_number",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={errors.vehicle_capacity}
                          helperText={errors.vehicle_capacity}
                          label="Vehicle Capacity*"
                          name="vehicle_capacity"
                          value={values.vehicle_capacity}
                          onChange={(e) =>
                            setFieldValue("vehicle_capacity", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={errors.vehicle_owner}
                          helperText={errors.vehicle_owner}
                          label="Vehicle Owner*"
                          name="vehicle_owner"
                          value={values.vehicle_owner}
                          onChange={(e) =>
                            setFieldValue("vehicle_owner", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={errors.vehicle_insurance_number}
                          helperText={errors.vehicle_insurance_number}
                          label="Vehicle Insurance Number*"
                          name="vehicle_insurance_number"
                          value={values.vehicle_insurance_number}
                          onChange={(e) =>
                            setFieldValue(
                              "vehicle_insurance_number",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Registration Date *"
                          name="registration_date"
                          value={
                            values.registration_date
                              ? dayjs(values.registration_date)
                              : null
                          }
                          onChange={(registration_date) =>
                            setFieldValue(
                              "registration_date",
                              registration_date
                                ? registration_date.toISOString()
                                : ""
                            )
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
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Fitness Certificate Date *"
                          name="fitness_certificate_date"
                          value={
                            values.fitness_certificate_date
                              ? dayjs(values.fitness_certificate_date)
                              : null
                          }
                          onChange={(fitness_certificate_date) =>
                            setFieldValue(
                              "fitness_certificate_date",
                              fitness_certificate_date
                                ? fitness_certificate_date.toISOString()
                                : ""
                            )
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
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Vehicle Insurance Date *"
                          name="vehicle_insurance_date"
                          value={
                            values.vehicle_insurance_date
                              ? dayjs(values.vehicle_insurance_date)
                              : null
                          }
                          onChange={(vehicle_insurance_date) =>
                            setFieldValue(
                              "vehicle_insurance_date",
                              vehicle_insurance_date
                                ? vehicle_insurance_date.toISOString()
                                : ""
                            )
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
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure you want to cancel?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          navigate("/dashboard/master/vehicle");
                        }
                      });
                    }}
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
              </Div>
            </Form>
          )}
        </Formik>
      </Div>
    </Div>
  );
}
