import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { alpha } from "@mui/material/styles";
import { ASSET_IMAGES } from "../../../app/utils/constants/paths";
import { getAssetPath } from "../../../app/utils/appHelpers";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resetPassword } from "app/services/apis/resetPassword";

const validationSchema = yup.object({
  employee_id: yup
    .string("Enter Employee Id")
    .required("Employee_ID is required"),
  new_password: yup
    .string("New Password is required")
    .required("New Password is required"),
  confirm_password: yup
    .string("Enter Confirm Password")
    .required("Confirm Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.new_password === value;
    }),
});

const ForgotPassword = ({ disableSmLogin }) => {
  const navigate = useNavigate();

  const onPasswordChange = async (values, setSubmitting) => {
    const data = await resetPassword(values);
    if (data.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Password Reset Successfully",
        text: "",
      });
      navigate("/user/login");
    } else {
      setSubmitting(false);
      Swal.fire({
        icon: "error",
        title: "Reset Password Failed",
        text: "",
      });
    }
  };

  return (
    <Div
      sx={{
        width: 800,
        maxWidth: "100%",
        margin: "auto",
        p: 4,
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CardContent
          sx={{
            flex: "0 1 300px",
            position: "relative",
            background: `#0267a0 url(${getAssetPath(
              `${ASSET_IMAGES}/widgets/keith-luke.jpg`,
              "640x428"
            )}) no-repeat center`,
            backgroundSize: "cover",

            "&::after": {
              display: "inline-block",
              position: "absolute",
              content: `''`,
              inset: 0,
              backgroundColor: alpha("#0267a0", 0.65),
            },
          }}
        >
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              color: "common.white",
              position: "relative",
              zIndex: 1,
              height: "100%",
            }}
          >
            <Div sx={{ mb: 2 }}>
              <Typography
                variant={"h3"}
                color={"inherit"}
                fontWeight={500}
                mb={3}
              >
                Reset Password
              </Typography>
            </Div>
          </Div>
        </CardContent>
        <CardContent sx={{ flex: 1, p: 4 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              employee_id: "",
              new_password: "",
              confirm_password: "",
            }}
            validationSchema={validationSchema}
          >
            {({ values, isSubmitting, setSubmitting }) => (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
                <Div sx={{ mt: 1, mb: 3 }}>
                  <JumboTextField
                    fullWidth
                    name="employee_id"
                    label="Employee ID"
                  />
                </Div>
                <Div sx={{ mt: 1, mb: 3 }}>
                  <JumboTextField
                    fullWidth
                    name="new_password"
                    label="Password"
                  />
                </Div>
                <Div sx={{ mt: 1, mb: 2 }}>
                  <JumboTextField
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                  />
                </Div>

                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{ mb: 3, mt: 3 }}
                  loading={isSubmitting}
                  onClick={() => onPasswordChange(values, setSubmitting)}
                >
                  Reset Password
                </LoadingButton>

                {!disableSmLogin && <React.Fragment></React.Fragment>}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Div>
  );
};

export default ForgotPassword;
