import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addCustomer, UpdateCustomer } from "app/services/apis/addCustomer";

import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddCustomer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);

  // Initialize the customer object with default or state values
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
    additional_fields: state?.additional_fields || "",
    vendor_type: state?.vendor_type || "",
    gst_number: state?.gst_number || "",
    pan_number: state?.pan_number || "",
    credit_limit: state?.credit_limit || "",
  };

  // Validation schema using yup
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
    email: yup
      .string("Enter Email")
      .email("Enter a valid email")
      .required("Email is required"),
    additional_fields: yup
      .string("Enter Additional Fields")
      .required("Additional Fields are required"),
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

  // Function to handle form submission
  const onCustomerSave = async (values) => {
    const body = { ...values };
    setSubmitting(true);
    if (pathname === "/master/customer/edit") {
      const data = await UpdateCustomer(body, state._id); // Replace with actual update API call
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Customer Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/customer");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addCustomer(body); // Replace with actual add API call
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Customer Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/customer");
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
        {pathname === "/master/customer/add"
          ? "Add New Customer"
          : "Edit Customer"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={customer}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onCustomerSave}
        >
          {({ values }) => (
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
                      <FormTextField1
                        name="customer_code"
                        label="Customer Code*"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1
                        name="customer_name"
                        label="Customer Name*"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="address" label="Address*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="city" label="City*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="state" label="State*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="pin_code" label="Pin Code*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1
                        name="contact_person"
                        label="Contact Person"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1
                        name="phone_number"
                        label="Phone Number*"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="email" label="Email*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1
                        name="additional_fields"
                        label="Additional Fields*"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="vendor_type" label="Vendor Type*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="gst_number" label="GST Number*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="pan_number" label="PAN Number*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1
                        name="credit_limit"
                        label="Credit Limit*"
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
              </Div>
            </Form>
          )}
        </Formik>
      </Div>
    </Div>
  );
}
