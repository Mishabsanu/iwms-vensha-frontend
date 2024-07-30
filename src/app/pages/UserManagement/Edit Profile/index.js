import Div from "@jumbo/shared/Div/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Typography } from "@mui/material";
import ListOptions from "app/components/Dropdown/ListOptions";
import FormTextField from "app/components/InputField/FormTextField";
import { loadUser } from "app/redux/actions/userAction";
import {
  codeList,
  genderList
} from "app/utils/constants/dropdowns.js";
import { dateFun } from "app/utils/constants/functions";
import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function EditUserProfile() {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    first_name: user?.first_name ? user?.first_name : "",
    last_name: user?.last_name ? user?.last_name : "",
    country_code: user?.country_code ? user?.country_code : "+91",
    phone: user?.mobile_no ? user?.mobile_no : null,
    gender: user?.gender ? user?.gender : "Select",
    age: user?.age ? user?.age : "",
    // date_of_birth: user?.date_of_birth ? user?.date_of_birth : formattedDate,
  });
  
  useEffect(() => {
    setData({
      first_name: user?.[0]?.first_name ? user?.[0]?.first_name : "",
      last_name: user?.[0]?.last_name ? user?.[0]?.last_name : "",
      country_code: user?.[0]?.country_code ? user?.[0]?.country_code : "+91",
      phone: user?.[0]?.mobile_no ? user?.[0]?.mobile_no : null,
      gender: user?.[0]?.gender ? user?.[0]?.gender : "Select",
      age: user?.[0]?.age ? user?.[0]?.age : "",
      // date_of_birth: user?.date_of_birth ? user?.date_of_birth : formattedDate,
    });
  }, [user]);

  const validationSchema = yup.object({
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

    phone: yup
      .number()
      .typeError("Phone number must be a number")
      .required("Phone Number is Required"),
    gender: yup
      .string()
      .required("Gender is required")
      .test(
        "gender-not-select",
        "Please select a valid Gender",
        (value) => value !== "Select"
      ),
    age: yup
      .number()
      .typeError("Age must be a number")
      .required("Age is required"),
    // date_of_birth: yup
    //   .date()
    //   .test("not-current-date", "Enter Valid Date of Birth", function (value) {
    //     if (!value) {
    //       // Handle case where value is not provided
    //       return false;
    //     }

    //     const currentDate = new Date();
    //     currentDate.setHours(0, 0, 0, 0); // Set time to midnight

    //     return value < currentDate; // Change this to <= to allow the current date
    //   })
    //   .required("Date Of Birth is required"),
  });

  const onUserSave = async (values) => {
    setSubmitting(true);
    try {
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      const data = await axios.post(
        `${process.env.REACT_APP_URL}/profile/update-user-profile?id=${user?.[0]?._id}`,
        { ...values, date_of_birth: dateFun(values?.date_of_birth) },
        config
      );
      if (data.status == 200) {
        Swal.fire({ icon: "success", title: "Profile Updated" });
        navigate("/dashboard/user");
        dispatch(loadUser());
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Profile Not Updated" });
    }
    setSubmitting(false);
  };

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">Edit User Profile</Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={data}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onUserSave}
          // onSubmit={(values) => console.log(values)}
        >
          {({ setFieldValue, values }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Div
                  sx={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    columnGap: 4,
                  }}
                >
                  <FormTextField name="first_name" label="First Name" />
                  <FormTextField name="last_name" label="Last Name" />
                  <ListOptions
                    name="gender"
                    label="Gender"
                    options={genderList}
                  />
                  <FormTextField name="age" label="Age" />
                  <Div sx={{ width: "45%" }}>
                    <Typography variant="h5">Phone No*</Typography>
                    <Div sx={{ display: "flex", mt: -1 }}>
                      <ListOptions
                        options={codeList}
                        name={"country_code"}
                        sx={{ width: "80px" }}
                      />
                      <FormTextField name="phone" sx={{ width: "100%" }} />
                    </Div>
                  </Div>

                  {/* <Div sx={outerDiv}>
                    <Typography variant="h5">Date of Birth</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{
                          "&.MuiTextField-root": {
                            height: "39px",
                            flexDirection: "unset",
                          },
                        }}
                        maxDate={dayjs()}
                        format="DD/MM/YYYY"
                        defaultValue={dayjs(values.date_of_birth)}
                        onChange={(date) => {
                          setFieldValue("date_of_birth", date);
                        }}
                      />
                      <Div sx={{ height: "30px" }}>
                        <ErrorMessage
                          name="date_of_birth"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Div>
                    </LocalizationProvider>
                  </Div> */}
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
