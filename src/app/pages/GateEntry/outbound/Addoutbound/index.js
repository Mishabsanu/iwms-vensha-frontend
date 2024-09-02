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
import AllApis from "app/Apis";
import { addGateEntryInbound } from "app/services/apis/addGateEntryInbound";
import { updateGateEntryInbound } from "app/services/apis/updateGateEntryInbound";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddOutbound() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [truckType, setTruckType] = useState([
    { _id: 1, truck_type: "16 tonner" },
    { _id: 2, truck_type: "9 tonner" },
    { _id: 3, truck_type: "Tata Ace" },
    { _id: 4, truck_type: "3 wheeler" },
  ]);
  const [customerData, setCustomerData] = useState([]);
  const [vendorData, setVendorData] = useState([]);

  useEffect(async () => {
    const vendors = await Axios.get(`${AllApis.dropdownList.vendor}`);
    setVendorData(vendors?.data?.result);
    const customers = await Axios.get(`${AllApis.dropdownList.customer}`);
    setCustomerData(customers?.data?.result);
  }, []);

  const [isSubmitting, setSubmitting] = useState(false);
  const { pathname } = useLocation();
  const data = state;

  const user = {
    date: data?.date || null,
    lr_number: data?.lr_number || "",
    truck_number: data?.truck_number || "",
    truck_type: data?.truck_type || "",
    from_vendor: data?.from_vendor || "",
    customer_name: data?.customer_name || "",
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
        const response = await updateGateEntryInbound({
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
        const response = await addGateEntryInbound(values);
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
        {pathname === "/gate-entry-outbound/addgate-entry"
          ? "Add New Outbound Gate Entry"
          : "Edit Outbound Gate Entry"}
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
                        label="LR Number *"
                        name="lr_number"
                        value={values.lr_number}
                        onChange={(e) =>
                          setFieldValue("lr_number", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.lr_number)}
                        helperText={errors.lr_number}
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
                        label="From Vendor *"
                        name="from_vendor"
                        value={values.from_vendor}
                        onChange={(e) =>
                          setFieldValue("from_vendor", e.target.value)
                        }
                        select
                        fullWidth
                        error={Boolean(errors.from_vendor)}
                        helperText={errors.from_vendor}
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {vendorData.map((item) => (
                          <MenuItem key={item._id} value={item.vendor_name}>
                            {item.vendor_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Customer Name *"
                        name="customer_name"
                        value={values.customer_name}
                        onChange={(e) =>
                          setFieldValue("customer_name", e.target.value)
                        }
                        select
                        fullWidth
                        error={Boolean(errors.customer_name)}
                        helperText={errors.customer_name}
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {customerData.map((item) => (
                          <MenuItem key={item._id} value={item.customer_name}>
                            {item.customer_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="P.O Number *"
                        name="po_number"
                        value={values.po_number}
                        onChange={(e) =>
                          setFieldValue("po_number", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.po_number)}
                        helperText={errors.po_number}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Invoice Number *"
                        name="invoice_number"
                        value={values.invoice_number}
                        onChange={(e) =>
                          setFieldValue("invoice_number", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.invoice_number)}
                        helperText={errors.invoice_number}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Invoice Qty *"
                        name="invoice_qty"
                        value={values.invoice_qty}
                        onChange={(e) =>
                          setFieldValue("invoice_qty", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.invoice_qty)}
                        helperText={errors.invoice_qty}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Invoice Value *"
                        name="invoice_value"
                        value={values.invoice_value}
                        onChange={(e) =>
                          setFieldValue("invoice_value", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.invoice_value)}
                        helperText={errors.invoice_value}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="eWay Bill Number *"
                        name="eway_bill_number"
                        value={values.eway_bill_number}
                        onChange={(e) =>
                          setFieldValue("eway_bill_number", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.eway_bill_number)}
                        helperText={errors.eway_bill_number}
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
