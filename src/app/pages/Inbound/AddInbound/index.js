import Div from "@jumbo/shared/Div/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addInbound } from "app/services/apis/addInbound";
import { updateInbound } from "app/services/apis/updateInbound";
import dayjs from "dayjs";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddInbound() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [truckType, setTruckType] = useState([
    { _id: 1, truck_type: "16 tonner" },
    { _id: 2, truck_type: "9 tonner" },
    { _id: 3, truck_type: "Tata Ace" },
    { _id: 4, truck_type: "3 wheeler" },
  ]);
  const [customerData, setCustomerData] = useState([
    { _id: 1, customer_name: "Emily White" },
    { _id: 2, customer_name: "Michael Green" },
    { _id: 3, customer_name: "Sophia Brown" },
    { _id: 4, customer_name: "James Taylor" },
    { _id: 5, customer_name: "Olivia Martinez" },
  ]);
  const [vendorData, setVendorData] = useState([
    { _id: 1, from_vendor: "North Supplies Co." },
    { _id: 2, from_vendor: "East Equipment Ltd." },
    { _id: 3, from_vendor: "South Distributors Inc." },
    { _id: 4, from_vendor: "West Logistics" },
    { _id: 5, from_vendor: "Central Goods" },
  ]);

  const [isSubmitting, setSubmitting] = useState(false);
  const { pathname } = useLocation();
  const data = state;

  const user = {
    date: data?.date || null,
    lr_number: data?.lr_number || "",
    truck_number: data?.truck_number || "",
    truck_type: data?.truck_type || "Select",
    from_vendor: data?.from_vendor || "Select",
    customer_name: data?.customer_name || "Select",
    po_number: data?.po_number || "",
    invoice_number: data?.invoice_number || "",
    invoice_qty: data?.invoice_qty || "",
    invoice_value: data?.invoice_value || "",
    eway_bill_number: data?.eway_bill_number || "",
  };

  const validationSchema = yup.object({
    date: yup.string().required("Date is required"),
    lr_number: yup.string().required("LR Number is required"),
    truck_number: yup.string().required("Truck Number is required"),
    truck_type: yup
      .string()
      .required("Truck Type is required")
      .test(
        "truck-type-not-select",
        "Please select a valid Truck Type",
        (value) => value !== "Select"
      ),
    from_vendor: yup
      .string()
      .required("Vendor is required")
      .test(
        "vendor-not-select",
        "Please select a valid Vendor",
        (value) => value !== "Select"
      ),
    customer_name: yup
      .string()
      .required("Customer Name is required")
      .test(
        "customer-name-not-select",
        "Please select a valid Customer Name",
        (value) => value !== "Select"
      ),
    po_number: yup.string().required("P.O Number is required"),
    invoice_number: yup.string().required("Invoice Number is required"),
    invoice_qty: yup.number().required("Invoice Qty is required"),
    invoice_value: yup.number().required("Invoice Value is required"),
    eway_bill_number: yup.string().required("eWay Bill Number is required"),
  });

  const onUserSave = async (values) => {
    setSubmitting(true);
    try {
      if (pathname === "/dashboard/edituser") {
        const response = await updateInbound({
          ...values,
          id: state._id,
        });
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Inbound Edited Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate("/dashboard/master/inbound");
        } else {
          throw new Error(response.message);
        }
      } else {
        const response = await addInbound(values);
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Inbound Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate("/dashboard/master/inbound");
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
        {pathname === "/master/inbound/add"
          ? "Add New Inbound"
          : "Edit Inbound"}
      </Typography>
      <Div>
        <Formik
          initialValues={user}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onUserSave}
        >
          {({ setFieldValue, values }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={2} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h5">Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input": { padding: 1 },
                        }}
                        format="DD-MM-YYYY"
                        onChange={(newValue) => {
                          setFieldValue(
                            "date",
                            newValue
                              ?.startOf("day")
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
                  <Grid item xs={12} sm={6} md={4}>
                    <FormTextField1 name="lr_number" label="LR Number *" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormTextField1
                      name="truck_number"
                      label="Truck Number *"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Div
                      sx={{
                        marginBottom: 2,
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h5">Truck Type *</Typography>
                      <Select
                        name="truck_type"
                        value={values?.truck_type}
                        onChange={(event) =>
                          setFieldValue("truck_type", event.target.value)
                        }
                        sx={{
                          ".css-153xi1v-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                            { padding: 1.2 },
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {truckType.map((item) => (
                          <MenuItem key={item._id} value={item.truck_type}>
                            {item.truck_type}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage
                        name="truck_type"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Div
                      sx={{
                        marginBottom: 2,
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h5">From Vendor *</Typography>
                      <Select
                        name="from_vendor"
                        value={values?.from_vendor}
                        onChange={(event) =>
                          setFieldValue("from_vendor", event.target.value)
                        }
                        sx={{
                          ".css-153xi1v-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                            { padding: 1.2 },
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {vendorData.map((item) => (
                          <MenuItem key={item._id} value={item.from_vendor}>
                            {item.from_vendor}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage
                        name="from_vendor"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Div
                      sx={{
                        marginBottom: 2,
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h5">Customer Name *</Typography>
                      <Select
                        name="customer_name"
                        value={values?.customer_name}
                        onChange={(event) =>
                          setFieldValue("customer_name", event.target.value)
                        }
                        sx={{
                          ".css-153xi1v-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                            { padding: 1.2 },
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {customerData.map((item) => (
                          <MenuItem key={item._id} value={item.customer_name}>
                            {item.customer_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage
                        name="customer_name"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <FormTextField1 name="po_number" label="P.O Number *" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormTextField1
                      name="invoice_number"
                      label="Invoice Number *"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormTextField1 name="invoice_qty" label="Invoice Qty *" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormTextField1
                      name="invoice_value"
                      label="Invoice Value *"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormTextField1
                      name="eway_bill_number"
                      label="eWay Bill Number *"
                    />
                  </Grid>
                </Grid>

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
              </Div>
            </Form>
          )}
        </Formik>
      </Div>
    </Div>
  );
}
