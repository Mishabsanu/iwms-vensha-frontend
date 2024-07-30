import { Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import React from "react";
import FormTextField from "app/components/InputField/FormTextField";
import Div from "@jumbo/shared/Div/Div";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const user = {
    username: state.first_name + " " + state.last_name,
    employee_id: state.employee_id,
    new_password: "",
    confirm_password: "",
  };
  const validationSchema = yup.object({
    new_password: yup.string().required("New Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const onPasswordSave = async (values) => {
    //
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const data = await axios.patch(
      `${process.env.REACT_APP_URL}/user/admin-change-password?id=${state?._id}`,
      {
        new_password: values?.new_password,
      },
      config
    );
    if (data.status == 200) {
      Swal.fire({ icon: "success", title: data.data.message });
      navigate("/dashboard/user");
    }
  };
  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">Change User Password</Typography>
      <Formik
        validateOnChange={true}
        initialValues={user}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onPasswordSave}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form noValidate autoComplete="off">
            <Div
              sx={{
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
                columnGap: 5,
                mt: 4,
              }}
            >
              <Div sx={{ width: "100%", display: "flex", columnGap: 5, mb: 4 }}>
                <Div sx={{ display: "flex", width: "45%" }}>
                  <Typography variant="h5">Username:</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "600", pl: 2 }}>
                    {user.username}
                  </Typography>
                </Div>
                <Div sx={{ display: "flex", width: "45%" }}>
                  <Typography variant="h5">Employee ID:</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "600", pl: 2 }}>
                    {user.employee_id}
                  </Typography>
                </Div>
              </Div>

              <FormTextField name={"new_password"} label={"New Password"} />
              <FormTextField
                name={"confirm_password"}
                label={"Confirm Password"}
              />
            </Div>
            <Div
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                mt: 4,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/dashboard/user");
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" sx={{ width: "100px" }}>
                Save
              </Button>
            </Div>
          </Form>
        )}
      </Formik>
    </Div>
  );
}
