import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Grid,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
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
    vendor_code: state?.vendor_code || "",
    vendor_name: state?.vendor_name || "",
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
    bank_details: state?.bank_details || "",
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
    contact_person: yup
      .string("Enter contact person")
      .required("contact person is required"),
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
          {({ values, errors, setFieldValue }) => (
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
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={Boolean(errors.vendor_code)}
                          helperText={errors.vendor_code}
                          label="Vendor Code*"
                          name="vendor_code"
                          value={values.vendor_code}
                          onChange={(e) =>
                            setFieldValue("vendor_code", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={Boolean(errors.vendor_name)}
                          helperText={errors.vendor_name}
                          label="Vendor Name*"
                          name="vendor_name"
                          value={values.vendor_name}
                          onChange={(e) =>
                            setFieldValue("vendor_name", e.target.value)
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
                          onChange={(e) =>
                            setFieldValue("city", e.target.value)
                          }
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
                          onChange={(e) =>
                            setFieldValue("state", e.target.value)
                          }
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
                          error={Boolean(errors.contact_person)}
                          helperText={errors.contact_person}
                          label="Contact Person"
                          name="contact_person"
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
                          onChange={(e) =>
                            setFieldValue("email", e.target.value)
                          }
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
                          error={Boolean(errors.bank_details)}
                          helperText={errors.bank_details}
                          label="Bank Details*"
                          name="bank_details"
                          value={values.bank_details}
                          onChange={(e) =>
                            setFieldValue("bank_details", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Div>
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
            </Form>
          )}
        </Formik>
      </Div>
    </Div>
  );
}
