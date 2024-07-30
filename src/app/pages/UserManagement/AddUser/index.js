import Div from "@jumbo/shared/Div/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AllApis from "app/Apis";
import ListOptions from "app/components/Dropdown/ListOptions";
import ListOptions1 from "app/components/Dropdown/ListOptions1";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addUser } from "app/services/apis/addUser";
import { getidApi } from "app/services/apis/getidAPi";
import { updateUserDetailsAdmin } from "app/services/apis/updateUserDetailsAdmin";
import {
  bloodGroup,
  codeList,
  genderList,
  outerDiv1,
} from "app/utils/constants/dropdowns.js";
import { City, Country, State } from "country-state-city";
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

export default function AddUser() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [roles, setRoles] = useState([]);
  const [empid, setempid] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [countryList, setCountryList] = useState(Country.getAllCountries());
  const [StateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const { pathname } = useLocation();
  const data = state;

  const user = {
    employee_id: data?.employee_id ? data.employee_id : empid,
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
    employee_id: yup
      .string("Enter Employee ID")
      .required("Employee ID is required")
      .matches(/^[0-9]+$/, "Employee ID must be a number"),
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

  const filterStates = (countryIsoCode) => {
    // Use your logic to filter states based on the selected country.
    const filteredStates = State.getAllStates().filter(
      (state) => state?.countryCode === countryIsoCode
    );
    setStateList(filteredStates);
  };

  const filterCities = (stateIsoCode, countryCode) => {
    // Use your logic to filter cities based on the selected state.
    const filteredCities = City.getAllCities().filter(
      (city) =>
        city.stateCode === stateIsoCode && city.countryCode == countryCode
    );
    setCityList(filteredCities);
  };

  function calculateAge(selectedDate) {
    const currentDate = new Date();
    const birthDate = new Date(selectedDate);

    // Calculate the difference in milliseconds
    const ageDifference = currentDate - birthDate;

    // Convert the difference to years
    const age = Math.floor(ageDifference / (1000 * 60 * 60 * 24 * 365.25));

    return age;
  }

  useEffect(() => {
    if (state) {
      const country = Country.getAllCountries().filter(
        (country) => country.name === state.country
      );
      const stateList = State.getAllStates().filter(
        (country) => country.name === state.state
      );
      filterStates(country[0]?.isoCode);
      filterCities(stateList[0]?.isoCode, country[0]?.isoCode);
    }
  }, []);

  useEffect(async () => {
    // setRoles(await getRoles());
    const roles = await Axios.get(`${AllApis.dropdownList.roles}`);
    setRoles(roles?.data?.result);
    setempid(await getidApi());
  }, []);

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname == "/dashboard/adduser" ? "Add New User" : "Edit User"}
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
                <Grid container rowSpacing={0} columnSpacing={3}>
                  <Grid item xs={4}>
                    <FormTextField1
                      name="employee_id"
                      label="Employee ID"
                      status={true}
                    />
                  </Grid>
                </Grid>

                <Grid container rowSpacing={0} columnSpacing={3}>
                  <Grid item xs={4}>
                    <FormTextField1 name="first_name" label="First Name*" />
                  </Grid>
                  <Grid item xs={4}>
                    <FormTextField1 name="last_name" label="Last Name*" />
                  </Grid>
                  <Grid item xs={4}>
                    <FormTextField1 name="email_id" label="Email*" />
                  </Grid>
                  <Grid item xs={4}>
                    <Div sx={outerDiv1}>
                      <Typography variant="h5">Country</Typography>
                      <Select
                        fullWidth
                        value={values?.country}
                        size="small"
                        onChange={(e, key) => {
                          setFieldValue("country", e?.target?.value);
                          setFieldValue("state", "");
                          setFieldValue("city", "");
                          setFieldValue(
                            "countryCode",
                            key.key.replace(/[.$]/g, "")
                          );
                          filterStates(key.key.replace(/[.$]/g, ""));
                        }}
                      >
                        {countryList?.map((country) => {
                          <MenuItem value={"Select"}>Select</MenuItem>;
                          return (
                            <MenuItem
                              value={country?.name}
                              key={country?.isoCode}
                            >
                              {country?.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <Div style={{ height: "30px" }}>
                        <ErrorMessage
                          name="country"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Div>
                    </Div>
                  </Grid>
                  <Grid item xs={4}>
                    <Div sx={outerDiv1}>
                      <Typography variant="h5">State</Typography>
                      <Select
                        fullWidth
                        value={values?.state}
                        size="small"
                        onChange={(e, key) => {
                          setFieldValue("state", e?.target?.value);
                          setFieldValue("city", "");
                          filterCities(
                            key.key.replace(/[.$]/g, ""),
                            values.countryCode
                          );
                        }}
                      >
                        {StateList?.map((state) => {
                          // console.log(state);
                          return (
                            <MenuItem value={state?.name} key={state?.isoCode}>
                              {state?.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <ErrorMessage
                        name="state"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Div>
                  </Grid>
                  <Grid item xs={4}>
                    <Div sx={outerDiv1}>
                      <Typography variant="h5">City</Typography>
                      <Select
                        fullWidth
                        value={values?.city}
                        size="small"
                        onChange={(e) => {
                          setFieldValue("city", e.target.value);
                        }}
                      >
                        {cityList?.map((city) => {
                          return (
                            <MenuItem key={city.name} value={city.name}>
                              {city.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <ErrorMessage
                        name="city"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Div>
                  </Grid>
                  <Grid item xs={4}>
                    <FormTextField1 name="address" label="Address" />
                  </Grid>
                  <Grid item xs={4}>
                    <FormTextField1 name="pincode" label="Pincode" />
                  </Grid>
                  <Grid item xs={4}>
                    <ListOptions1
                      name="gender"
                      label="Gender"
                      options={genderList}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <ListOptions1
                      name="blood_group"
                      label="Blood Group"
                      options={bloodGroup}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h5">Date Of Birth</Typography>
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
                          const age = calculateAge(
                            newValue
                              .startOf("day")
                              .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                          );
                          setFieldValue("age", age);
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
                    <FormTextField1
                      status={true}
                      sx={disabledStyling}
                      name="age"
                      label="Age"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Div sx={outerDiv1}>
                      <Typography variant="h5">Phone No*</Typography>
                      <Div sx={{ display: "flex", mt: -1 }}>
                        <ListOptions
                          options={codeList}
                          name={"country_code"}
                          sx={{ width: "80px" }}
                        />
                        <FormTextField1
                          name="mobile_no"
                          sx={{ width: "100%" }}
                        />
                      </Div>
                    </Div>
                  </Grid>

                  <Grid item xs={4}>
                    <Div sx={outerDiv1}>
                      <Typography variant="h5">Role*</Typography>
                      <Select
                        labelId="role_name"
                        name="role_id"
                        id="role_id"
                        value={values?.role_id}
                        onChange={(event) => {
                          const selectedRoleId = event.target.value;
                          const selectedRole = roles.find(
                            (role) => role._id === selectedRoleId
                          );
                          setFieldValue("role_id", selectedRoleId);
                        }}
                        sx={{
                          ".css-153xi1v-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                            { padding: 1.2 },
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {roles.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.role_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage
                        name={"role_id"}
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Div>
                  </Grid>
                  <Grid item xs={4}>
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
                  </Grid>
                </Grid>
                <Div sx={{ mt: 5 }}>
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
