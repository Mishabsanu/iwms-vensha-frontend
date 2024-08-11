import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
} from "@mui/material";
import { addCustomer, UpdateCustomer } from "app/services/apis/addCustomer";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddCustomer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);

  const customer = {
    customer_code: state?.customer_code || "",
    customer_name: state?.customer_name || "",
    address: state?.address || "",
    city: state?.city || "",
    state: state?.state || "",
    pin_code: state?.pin_code || "",
    contact_person: state?.contact_person || "",
    phone_number: state?.phone_number || "",
    email: state?.email || "",
    vendor_type: state?.vendor_type || "",
    gst_number: state?.gst_number || "",
    pan_number: state?.pan_number || "",
    credit_limit: state?.credit_limit || "",
  };

  const validationSchema = yup.object({
    customer_code: yup
      .string("Enter Customer Code")
      .required("Customer Code is required"),
    customer_name: yup
      .string("Enter Customer Name")
      .required("Customer Name is required"),
    address: yup.string("Enter Address").required("Address is required"),
    city: yup.string("Enter City").required("City is required"),
    state: yup.string("Enter State").required("State is required"),
    pin_code: yup
      .string("Enter Pin Code")
      .required("Pin Code is required")
      .matches(/^\d{6}$/, "Pin Code must be 6 digits"),
    phone_number: yup
      .string("Enter Phone Number")
      .required("Phone Number is required"),
    contact_person: yup
      .string("Enter contact person")
      .required("contact person is required"),
    email: yup
      .string("Enter Email")
      .email("Enter a valid email")
      .required("Email is required"),
    vendor_type: yup
      .string("Enter Vendor Type")
      .required("Vendor Type is required"),
    gst_number: yup
      .string("Enter GST Number")
      .required("GST Number is required"),
    pan_number: yup
      .string("Enter PAN Number")
      .required("PAN Number is required"),
    credit_limit: yup
      .number("Enter Credit Limit")
      .required("Credit Limit is required"),
  });

  const onCustomerSave = async (values) => {
    const body = { ...values };
    setSubmitting(true);
    if (pathname === "/master/customer/edit") {
      const data = await UpdateCustomer(body, state._id);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Customer Edited Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/customer");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
        });
      }
    } else {
      const data = await addCustomer(body);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Customer Added Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/customer");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.data?.message,
        });
      }
    }
    setSubmitting(false);
  };

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname === "/master/customer/add"
          ? "Add New Customer"
          : "Edit Customer"}
      </Typography>
      <Div>
        <Formik
          initialValues={customer}
          validationSchema={validationSchema}
          onSubmit={onCustomerSave}
        >
          {({ values, errors, setFieldValue }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.customer_code)}
                        helperText={errors.customer_code}
                        label="Customer Code*"
                        name="customer_code"
                        value={values.customer_code}
                        onChange={(e) =>
                          setFieldValue("customer_code", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.customer_name)}
                        helperText={errors.customer_name}
                        label="Customer Name*"
                        name="customer_name"
                        value={values.customer_name}
                        onChange={(e) =>
                          setFieldValue("customer_name", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.address)}
                        helperText={errors.address}
                        label="Address*"
                        name="address"
                        value={values.address}
                        onChange={(e) =>
                          setFieldValue("address", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.city)}
                        helperText={errors.city}
                        label="City*"
                        name="city"
                        value={values.city}
                        onChange={(e) => setFieldValue("city", e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.state)}
                        helperText={errors.state}
                        label="State*"
                        name="state"
                        value={values.state}
                        onChange={(e) => setFieldValue("state", e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.pin_code)}
                        helperText={errors.pin_code}
                        label="Pin Code*"
                        name="pin_code"
                        value={values.pin_code}
                        onChange={(e) =>
                          setFieldValue("pin_code", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Contact Person"
                        name="contact_person"
                        error={Boolean(errors.contact_person)}
                        helperText={errors.contact_person}
                        value={values.contact_person}
                        onChange={(e) =>
                          setFieldValue("contact_person", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.phone_number)}
                        helperText={errors.phone_number}
                        label="Phone Number*"
                        name="phone_number"
                        value={values.phone_number}
                        onChange={(e) =>
                          setFieldValue("phone_number", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        label="Email*"
                        name="email"
                        value={values.email}
                        onChange={(e) => setFieldValue("email", e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.vendor_type)}
                        helperText={errors.vendor_type}
                        label="Vendor Type*"
                        name="vendor_type"
                        value={values.vendor_type}
                        onChange={(e) =>
                          setFieldValue("vendor_type", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.gst_number)}
                        helperText={errors.gst_number}
                        label="GST Number*"
                        name="gst_number"
                        value={values.gst_number}
                        onChange={(e) =>
                          setFieldValue("gst_number", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.pan_number)}
                        helperText={errors.pan_number}
                        label="PAN Number*"
                        name="pan_number"
                        value={values.pan_number}
                        onChange={(e) =>
                          setFieldValue("pan_number", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.credit_limit)}
                        helperText={errors.credit_limit}
                        label="Credit Limit*"
                        name="credit_limit"
                        value={values.credit_limit}
                        onChange={(e) =>
                          setFieldValue("credit_limit", e.target.value)
                        }
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
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure you want to cancel?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes",
                      cancelButtonText: "No",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate("/dashboard/master/customer");
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
            </Form>
          )}
        </Formik>
      </Div>
    </Div>
  );
}
