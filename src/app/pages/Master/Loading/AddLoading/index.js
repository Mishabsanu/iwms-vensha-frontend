import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addLoading } from "app/services/apis/addLoading";
import { updateLoading } from "app/services/apis/updateLoading";

import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddLoading() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);

  const loadingData = {
    date: state?.date || "",
    group: state?.group || "",
    truck_number: state?.truck_number || "",
    truck_type: state?.truck_type || "",
    lr: state?.lr || "",
    seal: state?.seal || "",
    invoice: state?.invoice || "",
    invoice_value: state?.invoice_value || "",
  };

  // Validation schema using yup
  const validationSchema = yup.object({
    date: yup.string("Enter Date").required("Date is required"),
    group: yup.string("Enter Group").required("Group is required"),
    truck_number: yup
      .string("Enter Truck Number")
      .required("Truck Number is required"),
    truck_type: yup
      .string("Enter Truck Type")
      .required("Truck Type is required"),
    lr: yup.number("Enter LR").required("LR is required"),
    seal: yup.string("Enter Seal").required("Seal is required"),
    invoice: yup.date("Enter Invoice").required("Invoice is required"),
    invoice_value: yup
      .string("Enter Invoice Value")
      .required("Invoice Value is required"),
  });

  const onVehicleSave = async (values) => {
    const body = { ...values };
    setSubmitting(true);
    if (pathname === "/master/loading/edit") {
      const data = await updateLoading(body, state._id);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Loading Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/loading");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addLoading(body);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Loading Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/loading");
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
        {pathname === "/master/loading/add" ? "Add Loading" : "Edit Loading"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={loadingData}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onVehicleSave}
        >
          {({ values, setFieldValue }) => (
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
                    <Grid item xs={4}>
                      <Typography variant="h5">Loading Date</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              padding: 1,
                            },
                          }}
                          format="DD-MM-YYYY"
                          onChange={(newValue) => {
                            setFieldValue(
                              "date",
                              newValue
                                .startOf("day")
                                .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                            );
                          }}
                        />
                      </LocalizationProvider>
                      <Div sx={{ height: "30px" }}>
                        <ErrorMessage
                          name="dob"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Div>
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="group" label="Group*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1
                        name="truck_number"
                        label="Truck Number*"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="truck_type" label="Truck Type" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="lr" label="LR*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="seal" label="Seal*" />
                    </Grid>

                    <Grid item xs={4}>
                      <FormTextField1 name="invoice" label="Invoice*" />
                    </Grid>

                    <Grid item xs={4}>
                      <FormTextField1
                        name="invoice_value"
                        label="Invoice Value"
                      />
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
                          navigate("/dashboard/master/loading");
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
