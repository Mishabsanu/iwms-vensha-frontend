import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addVendor } from "app/services/apis/addVendor";
import { updateVendor } from "app/services/apis/updateVendor";

import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddVendor() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const vendor = {
    vendor_code: state?.vendor_code ? state.vendor_code : "",
    vendor_name: state?.vendor_name ? state.vendor_name : "",
    address: state?.address ? state.address : "",
    city: state?.city ? state.city : "",
    state: state?.state ? state.state : "",
    pin_code: state?.pin_code ? state.pin_code : "",
    contact_person: state?.contact_person ? state.contact_person : "",
    phone_number: state?.phone_number ? state.phone_number : "",
    email: state?.email ? state.email : "",

    vendor_type: state?.vendor_type ? state.vendor_type : "",
    gst_number: state?.gst_number ? state.gst_number : "",
    pan_number: state?.pan_number ? state.pan_number : "",
    bank_details: state?.bank_details ? state.bank_details : "",
  };
  const validationSchema = yup.object({
    vendor_code: yup
      .string("Enter Vendor Code")
      .required("Vendor Code is required"),
    vendor_name: yup
      .string("Enter Vendor Name")
      .required("Vendor Name is required"),
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
    vendor_type: yup
      .string("Enter Vendor Type")
      .required("Vendor Type is required"),
    gst_number: yup
      .string("Enter GST Number")
      .required("GST Number is required"),
    pan_number: yup
      .string("Enter PAN Number")
      .required("PAN Number is required"),
    bank_details: yup
      .string("Enter Bank Details")
      .required("Bank Details are required"),
  });

  const onVendorSave = async (values) => {
    const body = { ...values };
    setSubmitting(true);
    if (pathname === "/master/vendor/edit") {
      const data = await updateVendor(body, state._id);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Vendor Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/vendor");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addVendor(body);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Vendor Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/vendor");
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
        {pathname === "/master/vendor/add" ? "Add New Vendor" : "Edit Vendor"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={vendor}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onVendorSave}
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
                      <FormTextField1 name="vendor_code" label="Vendor Code*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="vendor_name" label="Vendor Name*" />
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
                        name="bank_details"
                        label="Bank Details*"
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
                          navigate("/dashboard/master/vendor");
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
