import Div from "@jumbo/shared/Div/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AllApis from "app/Apis";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addUser } from "app/services/apis/addUser";
import { updateUserDetailsAdmin } from "app/services/apis/updateUserDetailsAdmin";
import { outerDiv1 } from "app/utils/constants/dropdowns.js";
import dayjs from "dayjs";
import { ErrorMessage, Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

const disabledStyling = {
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#475259",
  },
  "& .MuiInputLabel-root": {
    color: "#475259", // Change label color to blue
  },
};

export default function AddProduction() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [productionLine, setproductionLine] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

  const { pathname } = useLocation();

  const data = state;

  const user = {
    // employee_id: data?.employee_id ? data.employee_id : empid,
    first_name: data?.first_name ? data?.first_name : "",
    last_name: data?.last_name ? data?.last_name : "",
    email_id: data?.email_id ? data?.email_id : "",
    gender: data?.gender ? data?.gender : "Select",
    blood_group: data?.blood_group ? data?.blood_group : "Select",
    age: data?.age ? data?.age : "",
    mobile_no: data?.mobile_no ? data?.mobile_no : "",
    country_code: data?.country_code ? data?.country_code : "+91",
    country: data?.country ? data?.country : "Select",
    state: data?.state ? data?.state : "",
    city: data?.city ? data?.city : "",
    pincode: data?.pincode ? data?.pincode : "",
    role_id: data?.role_id?._id ? data?.role_id?._id : "Select",
    address: data?.address ? data?.address : "",
    dob: data?.dob ? data?.dob : "",
    status: data?.status == false || data?.status == true ? data?.status : true,
    user_remarks: data?.user_remarks ? data?.user_remarks : "",
  };
  const validationSchema = yup.object({
    // employee_id: yup
    //   .string("Enter Employee ID")
    //   .required("Employee ID is required")
    //   .matches(/^[0-9]+$/, "Employee ID must be a number"),
    first_name: yup
      .string("Enter First Name")
      .required("First Name is required")
      .matches(
        /^[A-Za-z\s]+$/,
        "First Name must contain only alphabetic characters"
      ),
    last_name: yup
      .string("Enter Last Name")
      .required("Last Name is required")
      .matches(
        /^[A-Za-z\s]+$/,
        "Last Name must contain only alphabetic characters"
      ),
    email_id: yup
      .string("Enter your Email ID")
      .email("Enter a valid Email ID")
      .required("Email is required"),

    mobile_no: yup
      .string()
      .matches(/^\d+$/, "Phone number must contain only digits")
      // .length(10, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    role_id: yup
      .string()
      .required("Role is Required")
      .test(
        // "role-not-select",
        "",
        "Please select a valid Role",
        (value) => value !== "Select"
      ),
  });

  const onUserSave = async (values) => {
    const body = { ...values };

    setSubmitting(true);
    if (pathname == "/dashboard/edituser") {
      const data = await updateUserDetailsAdmin({
        ...body,
        id: state._id,
      });
      if (data?.status == 200) {
        Swal.fire({
          icon: "success",
          title: "User Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/user");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addUser(body);

      if (data?.status == 201) {
        Swal.fire({
          icon: "success",
          title: "User Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/user");
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

  useEffect(async () => {
    const productionLine = await Axios.get(
      `${AllApis.dropdownList.productionLine}`
    );
    setproductionLine(productionLine?.data?.result);
    const assignedData = await Axios.get(`${AllApis.dropdownList.assignedTo}`);
    setAssignedTo(assignedData?.data?.result);
    // setempid(await getidApi());
  }, []);

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname == "/dashboard/addproduction"
          ? "Add New Production"
          : "Edit Production"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={user}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onUserSave}
          // onSubmit={(values) => console.log(values)}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                {/* <Grid container rowSpacing={0} columnSpacing={3}>
                  <Grid item xs={4}>
                    <FormTextField1
                      name="employee_id"
                      label="Employee ID"
                      status={true}
                    />
                  </Grid>
                </Grid> */}
                <Grid container rowSpacing={0} columnSpacing={3}>
                  <Grid item xs={4}>
                    <Div sx={outerDiv1}>
                      <Typography variant="h5">Production Line*</Typography>
                      <Select
                        labelId="Production Line"
                        name="production_line_id"
                        id="production_line_id"
                        value={values?.production_line_id}
                        onChange={(event) => {
                          const selectedProductionLineId = event.target.value;
                          const selectedProduction = productionLine.find(
                            (production) =>
                              production._id === selectedProductionLineId
                          );
                          setFieldValue(
                            "production_line_id",
                            selectedProductionLineId
                          );
                        }}
                        sx={{
                          ".css-153xi1v-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                            { padding: 1.2 },
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {productionLine.map((item) => (
                          <MenuItem key={item?._id} value={item?._id}>
                            {item?.production_line_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage
                        name={"production_line_id"}
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Div>
                  </Grid>

                  <Grid item xs={4}>
                    <FormTextField1
                      name="process_order "
                      label="Process Order *"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h5">Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input": {
                            padding: 1,
                          },
                        }}
                        format="DD-MM-YYYY"
                        defaultValue={
                          values?.dob !== "" ? dayjs(values?.dob) : null
                        }
                        onChange={(newValue) => {
                          setFieldValue(
                            "dob",
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
                    <FormTextField1 name="sku_code" label="SKU Code *" />
                  </Grid>
                  <Grid item xs={4}>
                    <FormTextField1 name="sku_dese" label="SKU Desc *" />
                  </Grid>

                  <Grid item xs={4}>
                    <FormTextField1 name="sut" label="SUT *" />
                  </Grid>
                  <Grid item xs={4}>
                    <FormTextField1 name="batch" label="Batch *" />
                  </Grid>
                  <Grid item xs={4}>
                    <FormTextField1
                      name="process_order_qty"
                      label="Process Order Qty *"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Div sx={outerDiv1}>
                      <Typography variant="h5">Assigned To*</Typography>
                      <Select
                        labelId="Assigned To"
                        name="assigned_to"
                        id="assigned_to"
                        value={values?.assigned_to}
                        onChange={(event) => {
                          const selectedAssignedId = event.target.value;
                          const selectedAssigned = assignedTo.find(
                            (assigned) => assigned._id === selectedAssignedId
                          );
                          setFieldValue("assigned_to", selectedAssignedId);
                        }}
                        sx={{
                          ".css-153xi1v-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                            { padding: 1.2 },
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {assignedTo.map((item) => (
                          <MenuItem key={item?._id} value={item?._id}>
                            {`${item?.first_name} ${item?.last_name}`}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage
                        name={"production_line_id"}
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Div>
                  </Grid>

                  {/* <Grid item xs={4}>
                    <Div sx={outerDiv1}>
                      <Typography variant="h5">Remarks</Typography>
                      <TextField
                        multiline
                        size="small"
                        value={values.user_remarks}
                        sx={{ width: "100%" }}
                        name="user_remarks"
                        onChange={(e) =>
                          setFieldValue("user_remarks", e.target.value)
                        }
                      />
                    </Div>
                  </Grid> */}
                </Grid>
                {/* <Div sx={{ mt: 5 }}>
                  <Typography variant="h5">Status</Typography>
                  <Switch
                    onChange={(e) => {
                      setFieldValue(
                        "status",
                        values.status == true ? false : true
                      );
                    }}
                    defaultChecked={values.status == true ? true : false}
                    sx={{
                      p: 0,
                      width: "70px",
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: values.status === true ? "green" : "red",
                        width: "90%",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor:
                            values.status === true ? "green" : "red",
                        },
                    }}
                  />
                </Div> */}
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
                          navigate("/dashboard/user");
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
