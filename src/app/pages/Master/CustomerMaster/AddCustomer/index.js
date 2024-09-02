// import Div from "@jumbo/shared/Div";
// import { LoadingButton } from "@mui/lab";
// import {
//   Button,
//   Grid,
//   Typography,
//   TextField,
//   FormControl,
// } from "@mui/material";
// import { addCustomer, UpdateCustomer } from "app/services/apis/addCustomer";
// import { Formik, Form } from "formik";
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import * as yup from "yup";

// export default function AddCustomer() {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const { state } = useLocation();
//   const [isSubmitting, setSubmitting] = useState(false);

//   const customer = {
//     customer_code: state?.customer_code || "",
//     customer_name: state?.customer_name || "",
//     address: state?.address || "",
//     city: state?.city || "",
//     state: state?.state || "",
//     pin_code: state?.pin_code || "",
//     contact_person: state?.contact_person || "",
//     phone_number: state?.phone_number || "",
//     email: state?.email || "",
//     vendor_type: state?.vendor_type || "",
//     gst_number: state?.gst_number || "",
//     pan_number: state?.pan_number || "",
//     credit_limit: state?.credit_limit || "",
//   };

//   const validationSchema = yup.object({
//     customer_code: yup
//       .string("Enter Customer Code")
//       .required("Customer Code is required"),
//     customer_name: yup
//       .string("Enter Customer Name")
//       .required("Customer Name is required"),
//     address: yup.string("Enter Address").required("Address is required"),
//     city: yup.string("Enter City").required("City is required"),
//     state: yup.string("Enter State").required("State is required"),
//     pin_code: yup
//       .string("Enter Pin Code")
//       .required("Pin Code is required")
//       .matches(/^\d{6}$/, "Pin Code must be 6 digits"),
//     phone_number: yup
//       .string("Enter Phone Number")
//       .required("Phone Number is required"),
//     contact_person: yup
//       .string("Enter contact person")
//       .required("contact person is required"),
//     email: yup
//       .string("Enter Email")
//       .email("Enter a valid email")
//       .required("Email is required"),
//     vendor_type: yup
//       .string("Enter Vendor Type")
//       .required("Vendor Type is required"),
//     gst_number: yup
//       .string("Enter GST Number")
//       .required("GST Number is required"),
//     pan_number: yup
//       .string("Enter PAN Number")
//       .required("PAN Number is required"),
//     credit_limit: yup
//       .number("Enter Credit Limit")
//       .required("Credit Limit is required"),
//   });

//   const onCustomerSave = async (values) => {
//     const body = { ...values };
//     setSubmitting(true);
//     if (pathname === "/master/customer/edit") {
//       const data = await UpdateCustomer(body, state._id);
//       if (data?.data?.status === true) {
//         Swal.fire({
//           icon: "success",
//           title: "Customer Edited Successfully",
//           timer: 1000,
//           showConfirmButton: false,
//         });
//         navigate("/dashboard/master/customer");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: data?.message,
//         });
//       }
//     } else {
//       const data = await addCustomer(body);
//       if (data?.data?.status === true) {
//         Swal.fire({
//           icon: "success",
//           title: "Customer Added Successfully",
//           timer: 1000,
//           showConfirmButton: false,
//         });
//         navigate("/dashboard/master/customer");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: data?.data?.message,
//         });
//       }
//     }
//     setSubmitting(false);
//   };

//   return (
//     <Div sx={{ mt: -4 }}>
//       <Typography variant="h1">
//         {pathname === "/master/customer/add"
//           ? "Add New Customer"
//           : "Edit Customer"}
//       </Typography>
//       <Div>
//         <Formik
//           initialValues={customer}
//           validationSchema={validationSchema}
//           onSubmit={onCustomerSave}
//         >
//           {({ values, errors, setFieldValue }) => (
//             <Form noValidate autoComplete="off">
//               <Div sx={{ mt: 4 }}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.customer_code)}
//                         helperText={errors.customer_code}
//                         label="Customer Code*"
//                         name="customer_code"
//                         value={values.customer_code}
//                         onChange={(e) =>
//                           setFieldValue("customer_code", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.customer_name)}
//                         helperText={errors.customer_name}
//                         label="Customer Name*"
//                         name="customer_name"
//                         value={values.customer_name}
//                         onChange={(e) =>
//                           setFieldValue("customer_name", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.address)}
//                         helperText={errors.address}
//                         label="Address*"
//                         name="address"
//                         value={values.address}
//                         onChange={(e) =>
//                           setFieldValue("address", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.city)}
//                         helperText={errors.city}
//                         label="City*"
//                         name="city"
//                         value={values.city}
//                         onChange={(e) => setFieldValue("city", e.target.value)}
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.state)}
//                         helperText={errors.state}
//                         label="State*"
//                         name="state"
//                         value={values.state}
//                         onChange={(e) => setFieldValue("state", e.target.value)}
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.pin_code)}
//                         helperText={errors.pin_code}
//                         label="Pin Code*"
//                         name="pin_code"
//                         value={values.pin_code}
//                         onChange={(e) =>
//                           setFieldValue("pin_code", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         label="Contact Person"
//                         name="contact_person"
//                         error={Boolean(errors.contact_person)}
//                         helperText={errors.contact_person}
//                         value={values.contact_person}
//                         onChange={(e) =>
//                           setFieldValue("contact_person", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.phone_number)}
//                         helperText={errors.phone_number}
//                         label="Phone Number*"
//                         name="phone_number"
//                         value={values.phone_number}
//                         onChange={(e) =>
//                           setFieldValue("phone_number", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.email)}
//                         helperText={errors.email}
//                         label="Email*"
//                         name="email"
//                         value={values.email}
//                         onChange={(e) => setFieldValue("email", e.target.value)}
//                       />
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.vendor_type)}
//                         helperText={errors.vendor_type}
//                         label="Vendor Type*"
//                         name="vendor_type"
//                         value={values.vendor_type}
//                         onChange={(e) =>
//                           setFieldValue("vendor_type", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.gst_number)}
//                         helperText={errors.gst_number}
//                         label="GST Number*"
//                         name="gst_number"
//                         value={values.gst_number}
//                         onChange={(e) =>
//                           setFieldValue("gst_number", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.pan_number)}
//                         helperText={errors.pan_number}
//                         label="PAN Number*"
//                         name="pan_number"
//                         value={values.pan_number}
//                         onChange={(e) =>
//                           setFieldValue("pan_number", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.credit_limit)}
//                         helperText={errors.credit_limit}
//                         label="Credit Limit*"
//                         name="credit_limit"
//                         value={values.credit_limit}
//                         onChange={(e) =>
//                           setFieldValue("credit_limit", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//               </Div>

//               <Div
//                 sx={{
//                   width: "93.5%",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   gap: 3,
//                   mt: 3,
//                 }}
//               >
//                 <Button
//                   variant="outlined"
//                   onClick={() => {
//                     Swal.fire({
//                       title: "Are you sure you want to cancel?",
//                       icon: "warning",
//                       showCancelButton: true,
//                       confirmButtonText: "Yes",
//                       cancelButtonText: "No",
//                     }).then((result) => {
//                       if (result.isConfirmed) {
//                         navigate("/dashboard/master/customer");
//                       }
//                     });
//                   }}
//                 >
//                   Cancel
//                 </Button>

//                 <LoadingButton
//                   variant="contained"
//                   type="submit"
//                   sx={{ width: "100px" }}
//                   loading={isSubmitting}
//                 >
//                   Save
//                 </LoadingButton>
//               </Div>
//             </Form>
//           )}
//         </Formik>
//       </Div>
//     </Div>
//   );
// }











// import Div from "@jumbo/shared/Div";
// import { LoadingButton } from "@mui/lab";
// import {
//   Button,
//   Grid,
//   IconButton,
//   Typography,
//   TextField,
//   FormControl,
// } from "@mui/material";
// import { addCustomer, UpdateCustomer } from "app/services/apis/addCustomer";
// import { Formik, Form, FieldArray, Field } from "formik";
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";

// import Swal from "sweetalert2";
// import * as yup from "yup";

// export default function AddCustomer() {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const { state } = useLocation();
//   const [isSubmitting, setSubmitting] = useState(false);

//   const customer = {
//     customer_code: state?.customer_code || "",
//     customer_name: state?.customer_name || "",
//     address: state?.address || "",
//     city: state?.city || "",
//     state: state?.state || "",
//     pin_code: state?.pin_code || "",
//     contact_person: state?.contact_person || "",
//     phone_number: state?.phone_number || "",
//     email: state?.email || "",
//     vendor_type: state?.vendor_type || "",
//     gst_number: state?.gst_number || "",
//     pan_number: state?.pan_number || "",
//     credit_limit: state?.credit_limit || "",
//     bill_to_code: state?.bill_to_code || "",
//     bill_to_address: state?.bill_to_address || "",
//     bill_to_city: state?.bill_to_city || "",
//     bill_to_district: state?.bill_to_district || "",
//     bill_to_state: state?.bill_to_state || "",
//     bill_to_contact_person: state?.bill_to_contact_person || "",
//     bill_to_email: state?.bill_to_email || "",
//     bill_to_zone: state?.bill_to_zone || "",
//     ship_to: state?.ship_to || [
//       {
//         ship_to_code: "",
//         ship_to_address: "",
//         ship_to_city: "",
//         ship_to_district: "",
//         ship_to_state: "",
//         ship_to_contact_person: "",
//         ship_to_email: "",
//         ship_to_zone: "",
//       },
//     ],
//   };

//   const validationSchema = yup.object({
//     customer_code: yup
//       .string("Enter Customer Code")
//       .required("Customer Code is required"),
//     customer_name: yup
//       .string("Enter Customer Name")
//       .required("Customer Name is required"),
//     address: yup.string("Enter Address").required("Address is required"),
//     city: yup.string("Enter City").required("City is required"),
//     state: yup.string("Enter State").required("State is required"),
//     pin_code: yup
//       .string("Enter Pin Code")
//       .required("Pin Code is required")
//       .matches(/^\d{6}$/, "Pin Code must be 6 digits"),
//     phone_number: yup
//       .string("Enter Phone Number")
//       .required("Phone Number is required"),
//     contact_person: yup
//       .string("Enter Contact Person")
//       .required("Contact Person is required"),
//     email: yup
//       .string("Enter Email")
//       .email("Enter a valid email")
//       .required("Email is required"),
//     vendor_type: yup
//       .string("Enter Vendor Type")
//       .required("Vendor Type is required"),
//     gst_number: yup
//       .string("Enter GST Number")
//       .required("GST Number is required"),
//     pan_number: yup
//       .string("Enter PAN Number")
//       .required("PAN Number is required"),
//     credit_limit: yup
//       .number("Enter Credit Limit")
//       .required("Credit Limit is required"),
//     bill_to_code: yup
//       .string("Enter Bill To Code")
//       .required("Bill To Code is required"),
//     bill_to_address: yup
//       .string("Enter Bill To Address")
//       .required("Bill To Address is required"),
//     bill_to_city: yup
//       .string("Enter Bill To City")
//       .required("Bill To City is required"),
//     bill_to_district: yup
//       .string("Enter Bill To District")
//       .required("Bill To District is required"),
//     bill_to_state: yup
//       .string("Enter Bill To State")
//       .required("Bill To State is required"),
//     bill_to_contact_person: yup
//       .string("Enter Bill To Contact Person")
//       .required("Bill To Contact Person is required"),
//     bill_to_email: yup
//       .string("Enter Bill To Email")
//       .email("Enter a valid email")
//       .required("Bill To Email is required"),
//     bill_to_zone: yup
//       .string("Enter Bill To Zone")
//       .required("Bill To Zone is required"),
//     ship_to: yup.array().of(
//       yup.object({
//         ship_to_code: yup
//           .string("Enter Ship To Code")
//           .required("Ship To Code is required"),
//         ship_to_address: yup
//           .string("Enter Ship To Address")
//           .required("Ship To Address is required"),
//         ship_to_city: yup
//           .string("Enter Ship To City")
//           .required("Ship To City is required"),
//         ship_to_district: yup
//           .string("Enter Ship To District")
//           .required("Ship To District is required"),
//         ship_to_state: yup
//           .string("Enter Ship To State")
//           .required("Ship To State is required"),
//         ship_to_contact_person: yup
//           .string("Enter Ship To Contact Person")
//           .required("Ship To Contact Person is required"),
//         ship_to_email: yup
//           .string("Enter Ship To Email")
//           .email("Enter a valid email")
//           .required("Ship To Email is required"),
//         ship_to_zone: yup
//           .string("Enter Ship To Zone")
//           .required("Ship To Zone is required"),
//       })
//     ),
//   });

//   const onCustomerSave = async (values) => {
//     const body = { ...values };
//     setSubmitting(true);
//     if (pathname === "/master/customer/edit") {
//       const data = await UpdateCustomer(body, state._id);
//       if (data?.data?.status === true) {
//         Swal.fire({
//           icon: "success",
//           title: "Customer Edited Successfully",
//           timer: 1000,
//           showConfirmButton: false,
//         });
//         navigate("/dashboard/master/customer");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: data?.message,
//         });
//       }
//     } else {
//       const data = await addCustomer(body);
//       if (data?.data?.status === true) {
//         Swal.fire({
//           icon: "success",
//           title: "Customer Added Successfully",
//           timer: 1000,
//           showConfirmButton: false,
//         });
//         navigate("/dashboard/master/customer");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: data?.data?.message,
//         });
//       }
//     }
//     setSubmitting(false);
//   };

//   return (
//     <Div sx={{ mt: -4 }}>
//       <Typography variant="h1">
//         {pathname === "/master/customer/add"
//           ? "Add New Customer"
//           : "Edit Customer"}
//       </Typography>
//       <Div>
//         <Formik
//           initialValues={customer}
//           validationSchema={validationSchema}
//           onSubmit={onCustomerSave}
//         >
//           {({ values, errors, setFieldValue }) => (
//             <Form noValidate autoComplete="off">
//               {/* Customer Information Section */}
//               <Div sx={{ mt: 4 }}>
//                 <Typography variant="h2">Customer Information</Typography>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.customer_code)}
//                         helperText={errors.customer_code}
//                         label="Customer Code*"
//                         name="customer_code"
//                         value={values.customer_code}
//                         onChange={(e) =>
//                           setFieldValue("customer_code", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.customer_name)}
//                         helperText={errors.customer_name}
//                         label="Customer Name*"
//                         name="customer_name"
//                         value={values.customer_name}
//                         onChange={(e) =>
//                           setFieldValue("customer_name", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.address)}
//                         helperText={errors.address}
//                         label="Address*"
//                         name="address"
//                         value={values.address}
//                         onChange={(e) =>
//                           setFieldValue("address", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.city)}
//                         helperText={errors.city}
//                         label="City*"
//                         name="city"
//                         value={values.city}
//                         onChange={(e) => setFieldValue("city", e.target.value)}
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.state)}
//                         helperText={errors.state}
//                         label="State*"
//                         name="state"
//                         value={values.state}
//                         onChange={(e) =>
//                           setFieldValue("state", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.pin_code)}
//                         helperText={errors.pin_code}
//                         label="Pin Code*"
//                         name="pin_code"
//                         value={values.pin_code}
//                         onChange={(e) =>
//                           setFieldValue("pin_code", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.phone_number)}
//                         helperText={errors.phone_number}
//                         label="Phone Number*"
//                         name="phone_number"
//                         value={values.phone_number}
//                         onChange={(e) =>
//                           setFieldValue("phone_number", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.contact_person)}
//                         helperText={errors.contact_person}
//                         label="Contact Person*"
//                         name="contact_person"
//                         value={values.contact_person}
//                         onChange={(e) =>
//                           setFieldValue("contact_person", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.email)}
//                         helperText={errors.email}
//                         label="Email*"
//                         name="email"
//                         value={values.email}
//                         onChange={(e) => setFieldValue("email", e.target.value)}
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.vendor_type)}
//                         helperText={errors.vendor_type}
//                         label="Vendor Type*"
//                         name="vendor_type"
//                         value={values.vendor_type}
//                         onChange={(e) =>
//                           setFieldValue("vendor_type", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.gst_number)}
//                         helperText={errors.gst_number}
//                         label="GST Number*"
//                         name="gst_number"
//                         value={values.gst_number}
//                         onChange={(e) => setFieldValue("gst_number", e.target.value)}
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.pan_number)}
//                         helperText={errors.pan_number}
//                         label="PAN Number*"
//                         name="pan_number"
//                         value={values.pan_number}
//                         onChange={(e) => setFieldValue("pan_number", e.target.value)}
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.credit_limit)}
//                         helperText={errors.credit_limit}
//                         label="Credit Limit*"
//                         name="credit_limit"
//                         type="number"
//                         value={values.credit_limit}
//                         onChange={(e) => setFieldValue("credit_limit", e.target.value)}
//                       />
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//               </Div>

//               {/* Bill To Information Section */}
//               <Div sx={{ mt: 4 }}>
//                 <Typography variant="h2">Bill To Information</Typography>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.bill_to_code)}
//                         helperText={errors.bill_to_code}
//                         label="Bill To Code*"
//                         name="bill_to_code"
//                         value={values.bill_to_code}
//                         onChange={(e) =>
//                           setFieldValue("bill_to_code", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.bill_to_address)}
//                         helperText={errors.bill_to_address}
//                         label="Bill To Address*"
//                         name="bill_to_address"
//                         value={values.bill_to_address}
//                         onChange={(e) =>
//                           setFieldValue("bill_to_address", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.bill_to_city)}
//                         helperText={errors.bill_to_city}
//                         label="Bill To City*"
//                         name="bill_to_city"
//                         value={values.bill_to_city}
//                         onChange={(e) =>
//                           setFieldValue("bill_to_city", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.bill_to_district)}
//                         helperText={errors.bill_to_district}
//                         label="Bill To District*"
//                         name="bill_to_district"
//                         value={values.bill_to_district}
//                         onChange={(e) =>
//                           setFieldValue("bill_to_district", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.bill_to_state)}
//                         helperText={errors.bill_to_state}
//                         label="Bill To State*"
//                         name="bill_to_state"
//                         value={values.bill_to_state}
//                         onChange={(e) =>
//                           setFieldValue("bill_to_state", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.bill_to_contact_person)}
//                         helperText={errors.bill_to_contact_person}
//                         label="Bill To Contact Person*"
//                         name="bill_to_contact_person"
//                         value={values.bill_to_contact_person}
//                         onChange={(e) =>
//                           setFieldValue("bill_to_contact_person", e.target.value)
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.bill_to_email)}
//                         helperText={errors.bill_to_email}
//                         label="Bill To Email*"
//                         name="bill_to_email"
//                         value={values.bill_to_email}
//                         onChange={(e) => setFieldValue("bill_to_email", e.target.value)}
//                       />
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <FormControl fullWidth>
//                       <TextField
//                         error={Boolean(errors.bill_to_zone)}
//                         helperText={errors.bill_to_zone}
//                         label="Bill To Zone*"
//                         name="bill_to_zone"
//                         value={values.bill_to_zone}
//                         onChange={(e) => setFieldValue("bill_to_zone", e.target.value)}
//                       />
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//               </Div>

//               {/* Ship To Information Section */}
//               <Div sx={{ mt: 4 }}>
//                 <Typography variant="h2">Ship To Information</Typography>
//                 <FieldArray
//                   name="ship_to"
//                   render={arrayHelpers => (
//                     <div>
//                       {values.ship_to && values.ship_to.length > 0 ? (
//                         values.ship_to.map((ship, index) => (
//                           <Div key={index} sx={{ mb: 2 }}>
//                             <Typography variant="h3">Ship To {index + 1}</Typography>
//                             <Grid container spacing={3}>
//                               <Grid item xs={12} sm={6} md={4}>
//                                 <FormControl fullWidth>
//                                   <TextField
//                                     error={Boolean(errors.ship_to?.[index]?.ship_to_code)}
//                                     helperText={errors.ship_to?.[index]?.ship_to_code}
//                                     label="Ship To Code*"
//                                     name={`ship_to.${index}.ship_to_code`}
//                                     value={ship.ship_to_code}
//                                     onChange={(e) =>
//                                       setFieldValue(`ship_to.${index}.ship_to_code`, e.target.value)
//                                     }
//                                   />
//                                 </FormControl>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={4}>
//                                 <FormControl fullWidth>
//                                   <TextField
//                                     error={Boolean(errors.ship_to?.[index]?.ship_to_address)}
//                                     helperText={errors.ship_to?.[index]?.ship_to_address}
//                                     label="Ship To Address*"
//                                     name={`ship_to.${index}.ship_to_address`}
//                                     value={ship.ship_to_address}
//                                     onChange={(e) =>
//                                       setFieldValue(`ship_to.${index}.ship_to_address`, e.target.value)
//                                     }
//                                   />
//                                 </FormControl>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={4}>
//                                 <FormControl fullWidth>
//                                   <TextField
//                                     error={Boolean(errors.ship_to?.[index]?.ship_to_city)}
//                                     helperText={errors.ship_to?.[index]?.ship_to_city}
//                                     label="Ship To City*"
//                                     name={`ship_to.${index}.ship_to_city`}
//                                     value={ship.ship_to_city}
//                                     onChange={(e) =>
//                                       setFieldValue(`ship_to.${index}.ship_to_city`, e.target.value)
//                                     }
//                                   />
//                                 </FormControl>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={4}>
//                                 <FormControl fullWidth>
//                                   <TextField
//                                     error={Boolean(errors.ship_to?.[index]?.ship_to_district)}
//                                     helperText={errors.ship_to?.[index]?.ship_to_district}
//                                     label="Ship To District*"
//                                     name={`ship_to.${index}.ship_to_district`}
//                                     value={ship.ship_to_district}
//                                     onChange={(e) =>
//                                       setFieldValue(`ship_to.${index}.ship_to_district`, e.target.value)
//                                     }
//                                   />
//                                 </FormControl>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={4}>
//                                 <FormControl fullWidth>
//                                   <TextField
//                                     error={Boolean(errors.ship_to?.[index]?.ship_to_state)}
//                                     helperText={errors.ship_to?.[index]?.ship_to_state}
//                                     label="Ship To State*"
//                                     name={`ship_to.${index}.ship_to_state`}
//                                     value={ship.ship_to_state}
//                                     onChange={(e) =>
//                                       setFieldValue(`ship_to.${index}.ship_to_state`, e.target.value)
//                                     }
//                                   />
//                                 </FormControl>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={4}>
//                                 <FormControl fullWidth>
//                                   <TextField
//                                     error={Boolean(errors.ship_to?.[index]?.ship_to_contact_person)}
//                                     helperText={errors.ship_to?.[index]?.ship_to_contact_person}
//                                     label="Ship To Contact Person*"
//                                     name={`ship_to.${index}.ship_to_contact_person`}
//                                     value={ship.ship_to_contact_person}
//                                     onChange={(e) =>
//                                       setFieldValue(`ship_to.${index}.ship_to_contact_person`, e.target.value)
//                                     }
//                                   />
//                                 </FormControl>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={4}>
//                                 <FormControl fullWidth>
//                                   <TextField
//                                     error={Boolean(errors.ship_to?.[index]?.ship_to_email)}
//                                     helperText={errors.ship_to?.[index]?.ship_to_email}
//                                     label="Ship To Email*"
//                                     name={`ship_to.${index}.ship_to_email`}
//                                     value={ship.ship_to_email}
//                                     onChange={(e) =>
//                                       setFieldValue(`ship_to.${index}.ship_to_email`, e.target.value)
//                                     }
//                                   />
//                                 </FormControl>
//                               </Grid>
//                               <Grid item xs={12} sm={6} md={4}>
//                                 <FormControl fullWidth>
//                                   <TextField
//                                     error={Boolean(errors.ship_to?.[index]?.ship_to_zone)}
//                                     helperText={errors.ship_to?.[index]?.ship_to_zone}
//                                     label="Ship To Zone*"
//                                     name={`ship_to.${index}.ship_to_zone`}
//                                     value={ship.ship_to_zone}
//                                     onChange={(e) =>
//                                       setFieldValue(`ship_to.${index}.ship_to_zone`, e.target.value)
//                                     }
//                                   />
//                                 </FormControl>
//                               </Grid>
                              
//                             </Grid>
//                             <IconButton
                             
                            
//                               onClick={() => arrayHelpers.remove(index)}
//                               sx={{ mt: 2 }}
//                             >
//                               <RemoveIcon /> 
//                             </IconButton>
//                           </Div>
//                         ))
//                       ) : (
//                         <Typography>No Ship To sections</Typography>
//                       )}
                      
//                       <IconButton
                        
//                         onClick={() =>
//                           arrayHelpers.push({
//                             ship_to_code: "",
//                             ship_to_address: "",
//                             ship_to_city: "",
//                             ship_to_district: "",
//                             ship_to_state: "",
//                             ship_to_contact_person: "",
//                             ship_to_email: "",
//                             ship_to_zone: "",
//                           })
//                         }
//                         sx={{ mt: 2 }}
//                       >
//                         <AddIcon />
//                       </IconButton>
                      
//                     </div>
//                   )}
//                 />
//               </Div>

//               <Div
//                 sx={{
//                   width: "93.5%",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   gap: 3,
//                   mt: 3,
//                 }}
//               >
//                 <Button
//                   variant="outlined"
//                   onClick={() => {
//                     Swal.fire({
//                       title: "Are you sure you want to cancel?",
//                       icon: "warning",
//                       showCancelButton: true,
//                       confirmButtonText: "Yes",
//                       cancelButtonText: "No",
//                     }).then((result) => {
//                       if (result.isConfirmed) {
//                         navigate("/dashboard/master/customer");
//                       }
//                     });
//                   }}
//                 >
//                   Cancel
//                 </Button>

//                 <LoadingButton
//                   variant="contained"
//                   type="submit"
//                   sx={{ width: "100px" }}
//                   loading={isSubmitting}
//                 >
//                   Save
//                 </LoadingButton>
//               </Div>
//             </Form>
//           )}
//         </Formik>
//       </Div>
//     </Div>
//   );
// }





import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  TextField,
  FormControl,
} from "@mui/material";
import { addCustomer, UpdateCustomer } from "app/services/apis/addCustomer";
import { Formik, Form, FieldArray, Field } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

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
    bill_to_code: state?.bill_to_code || "",
    bill_to_address: state?.bill_to_address || "",
    bill_to_city: state?.bill_to_city || "",
    bill_to_district: state?.bill_to_district || "",
    bill_to_state: state?.bill_to_state || "",
    bill_to_contact_person: state?.bill_to_contact_person || "",
    bill_to_email: state?.bill_to_email || "",
    bill_to_zone: state?.bill_to_zone || "",
    ship_to: state?.ship_to || [
      {
        ship_to_code: "",
        ship_to_address:  "",
        ship_to_city: "",
        ship_to_district:  "",
        ship_to_state:  "",
        ship_to_contact_person:  "",
        ship_to_email:  "",
        ship_to_zone: "",
      },
    ],
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
      .string("Enter Contact Person")
      .required("Contact Person is required"),
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
    bill_to_code: yup
      .string("Enter Bill To Code")
      .required("Bill To Code is required"),
    bill_to_address: yup
      .string("Enter Bill To Address")
      .required("Bill To Address is required"),
    bill_to_city: yup
      .string("Enter Bill To City")
      .required("Bill To City is required"),
    bill_to_district: yup
      .string("Enter Bill To District")
      .required("Bill To District is required"),
    bill_to_state: yup
      .string("Enter Bill To State")
      .required("Bill To State is required"),
    bill_to_contact_person: yup
      .string("Enter Bill To Contact Person")
      .required("Bill To Contact Person is required"),
    bill_to_email: yup
      .string("Enter Bill To Email")
      .email("Enter a valid email")
      .required("Bill To Email is required"),
    bill_to_zone: yup
      .string("Enter Bill To Zone")
      .required("Bill To Zone is required"),
    ship_to: yup.array().of(
      yup.object({
        ship_to_code: yup
          .string("Enter Ship To Code")
          .required("Ship To Code is required"),
        ship_to_address: yup
          .string("Enter Ship To Address")
          .required("Ship To Address is required"),
        ship_to_city: yup
          .string("Enter Ship To City")
          .required("Ship To City is required"),
        ship_to_district: yup
          .string("Enter Ship To District")
          .required("Ship To District is required"),
        ship_to_state: yup
          .string("Enter Ship To State")
          .required("Ship To State is required"),
        ship_to_contact_person: yup
          .string("Enter Ship To Contact Person")
          .required("Ship To Contact Person is required"),
        ship_to_email: yup
          .string("Enter Ship To Email")
          .email("Enter a valid email")
          .required("Ship To Email is required"),
        ship_to_zone: yup
          .string("Enter Ship To Zone")
          .required("Ship To Zone is required"),
      })
    ),
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
              {/* Customer Information Section */}
              <Div sx={{ mt: 4 }}>
                <Typography variant="h2">Customer Information</Typography>
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
                        error={Boolean(errors.contact_person)}
                        helperText={errors.contact_person}
                        label="Contact Person*"
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
                        onChange={(e) => setFieldValue("gst_number", e.target.value)}
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
                        onChange={(e) => setFieldValue("pan_number", e.target.value)}
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
                        type="number"
                        value={values.credit_limit}
                        onChange={(e) => setFieldValue("credit_limit", e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Div>

              {/* Bill To Information Section */}
              <Div sx={{ mt: 4 }}>
                <Typography variant="h2">Bill To Information</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.bill_to_code)}
                        helperText={errors.bill_to_code}
                        label="Bill To Code*"
                        name="bill_to_code"
                        value={values.bill_to_code}
                        onChange={(e) =>
                          setFieldValue("bill_to_code", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.bill_to_address)}
                        helperText={errors.bill_to_address}
                        label="Bill To Address*"
                        name="bill_to_address"
                        value={values.bill_to_address}
                        onChange={(e) =>
                          setFieldValue("bill_to_address", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.bill_to_city)}
                        helperText={errors.bill_to_city}
                        label="Bill To City*"
                        name="bill_to_city"
                        value={values.bill_to_city}
                        onChange={(e) =>
                          setFieldValue("bill_to_city", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.bill_to_district)}
                        helperText={errors.bill_to_district}
                        label="Bill To District*"
                        name="bill_to_district"
                        value={values.bill_to_district}
                        onChange={(e) =>
                          setFieldValue("bill_to_district", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.bill_to_state)}
                        helperText={errors.bill_to_state}
                        label="Bill To State*"
                        name="bill_to_state"
                        value={values.bill_to_state}
                        onChange={(e) =>
                          setFieldValue("bill_to_state", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.bill_to_contact_person)}
                        helperText={errors.bill_to_contact_person}
                        label="Bill To Contact Person*"
                        name="bill_to_contact_person"
                        value={values.bill_to_contact_person}
                        onChange={(e) =>
                          setFieldValue("bill_to_contact_person", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.bill_to_email)}
                        helperText={errors.bill_to_email}
                        label="Bill To Email*"
                        name="bill_to_email"
                        value={values.bill_to_email}
                        onChange={(e) => setFieldValue("bill_to_email", e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(errors.bill_to_zone)}
                        helperText={errors.bill_to_zone}
                        label="Bill To Zone*"
                        name="bill_to_zone"
                        value={values.bill_to_zone}
                        onChange={(e) => setFieldValue("bill_to_zone", e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Div>















              {/* Ship To Information Section */}
              <Div sx={{ mt: 4 }}>
                <Typography variant="h2">Ship To Information</Typography>
                <FieldArray
                  name="ship_to"
                  render={arrayHelpers => (
                    <div>
                      {values.ship_to && values.ship_to.length > 0 ? (
                        values.ship_to.map((ship, index) => (
                          <Div key={index} sx={{ mb: 2 }}>
                            <Typography variant="h3">Ship To {index + 1}</Typography>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                  <TextField
                                    error={Boolean(errors.ship_to?.[index]?.ship_to_code)}
                                    helperText={errors.ship_to?.[index]?.ship_to_code}
                                    label="Ship To Code*"
                                    name={`ship_to.${index}.ship_to_code`}
                                    value={ship.ship_to_code}
                                    onChange={(e) =>
                                      setFieldValue(`ship_to.${index}.ship_to_code`, e.target.value)
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                  <TextField
                                    error={Boolean(errors.ship_to?.[index]?.ship_to_address)}
                                    helperText={errors.ship_to?.[index]?.ship_to_address}
                                    label="Ship To Address*"
                                    name={`ship_to.${index}.ship_to_address`}
                                    value={ship.ship_to_address}
                                    onChange={(e) =>
                                      setFieldValue(`ship_to.${index}.ship_to_address`, e.target.value)
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                  <TextField
                                    error={Boolean(errors.ship_to?.[index]?.ship_to_city)}
                                    helperText={errors.ship_to?.[index]?.ship_to_city}
                                    label="Ship To City*"
                                    name={`ship_to.${index}.ship_to_city`}
                                    value={ship.ship_to_city}
                                    onChange={(e) =>
                                      setFieldValue(`ship_to.${index}.ship_to_city`, e.target.value)
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                  <TextField
                                    error={Boolean(errors.ship_to?.[index]?.ship_to_district)}
                                    helperText={errors.ship_to?.[index]?.ship_to_district}
                                    label="Ship To District*"
                                    name={`ship_to.${index}.ship_to_district`}
                                    value={ship.ship_to_district}
                                    onChange={(e) =>
                                      setFieldValue(`ship_to.${index}.ship_to_district`, e.target.value)
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                  <TextField
                                    error={Boolean(errors.ship_to?.[index]?.ship_to_state)}
                                    helperText={errors.ship_to?.[index]?.ship_to_state}
                                    label="Ship To State*"
                                    name={`ship_to.${index}.ship_to_state`}
                                    value={ship.ship_to_state}
                                    onChange={(e) =>
                                      setFieldValue(`ship_to.${index}.ship_to_state`, e.target.value)
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                  <TextField
                                    error={Boolean(errors.ship_to?.[index]?.ship_to_contact_person)}
                                    helperText={errors.ship_to?.[index]?.ship_to_contact_person}
                                    label="Ship To Contact Person*"
                                    name={`ship_to.${index}.ship_to_contact_person`}
                                    value={ship.ship_to_contact_person}
                                    onChange={(e) =>
                                      setFieldValue(`ship_to.${index}.ship_to_contact_person`, e.target.value)
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                  <TextField
                                    error={Boolean(errors.ship_to?.[index]?.ship_to_email)}
                                    helperText={errors.ship_to?.[index]?.ship_to_email}
                                    label="Ship To Email*"
                                    name={`ship_to.${index}.ship_to_email`}
                                    value={ship.ship_to_email}
                                    onChange={(e) =>
                                      setFieldValue(`ship_to.${index}.ship_to_email`, e.target.value)
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                  <TextField
                                    error={Boolean(errors.ship_to?.[index]?.ship_to_zone)}
                                    helperText={errors.ship_to?.[index]?.ship_to_zone}
                                    label="Ship To Zone*"
                                    name={`ship_to.${index}.ship_to_zone`}
                                    value={ship.ship_to_zone}
                                    onChange={(e) =>
                                      setFieldValue(`ship_to.${index}.ship_to_zone`, e.target.value)
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <IconButton
                             sx={{
                              mt: 2,
                              color: "red",
                              borderColor: "red",
                              "&:hover": {
                                borderColor: "darkred",
                                color: "darkred",
                              },
                            }}
                            
                              onClick={() => arrayHelpers.remove(index)}
                            
                            >
                              <RemoveCircleIcon />
                            </IconButton>
                            </Grid>
                            
                          </Div>
                        ))
                      ) : (
                        <Typography>No Ship To sections</Typography>
                      )}
                       <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() =>  arrayHelpers.push({
                        ship_to_code: "",
                        ship_to_address: "",
                        ship_to_city: "",
                        ship_to_district: "",
                        ship_to_state: "",
                        ship_to_contact_person: "",
                        ship_to_email: "",
                        ship_to_zone: "",
                      })
                    }
                      sx={{ mt: 2 }} // Margin top for button
                    >
                      Add Ship To
                    </Button>
                      
                      
                    </div>
                  )}
                />
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