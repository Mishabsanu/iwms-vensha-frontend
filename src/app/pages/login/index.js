import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ForgotPasswordForm from "app/components/ForgotPasswordForm/ForgotPasswordForm";
import { clearErrors, login } from "app/redux/actions/userAction";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { getAssetPath } from "../../../app/utils/appHelpers";
import { ASSET_IMAGES } from "../../../app/utils/constants/paths";
import FullViewContent from "app/components/FullViewContent";

const validationSchema = yup.object({
  employee_id: yup
    .number()
    .typeError("Employee ID is Invalid")
    .required("Employee Id is Required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login = ({ disableSmLogin }) => {
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.userReducer
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { showDialog, hideDialog } = useJumboDialog();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: error,
        customClass: {
          container: "popupImportant",
        },
      });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/dashboard");
    }
    // } else if (isAuthenticated && user.role != "admin") {
    //   navigate("/mycontent");
    // }
  }, [dispatch, error, isAuthenticated]);

  const onSignIn = (values) => {
    dispatch(login(values?.employee_id, values?.password, setSubmitting));
  };

  const handleForgotPassword = () => {
    console.log("111111111111");
    showDialog({
      title: "Enter Email For Recovery",
      content: <ForgotPasswordForm hideDialogue={hideDialog} />,
    });
  };

  return (
    <FullViewContent>
      {/* <Typography
      variant="h1"
      sx={{
        fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
        color: 'purple',
        textAlign: 'center',
      }}
    >
      Vensha Techsoft Pvt Ltd
    </Typography> */}

      <Div
        sx={{
          width: 800,
          maxWidth: "100%",
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
              flex: 1,
              height: "90%",
              ml: 1,
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
                height: "90%",
              }}
            >
              <Div sx={{ ml: 4, mt: 0 }}>
                <img
                  src={getAssetPath(`${ASSET_IMAGES}/venshaLogo.jpg`)}
                  alt=""
                  style={{ width: "80%", height: "80%" }}
                />
              </Div>
            </Div>
          </CardContent>
          <CardContent sx={{ flex: 1, py: 7, pl: 2 }}>
            <Formik
              validateOnChange={true}
              initialValues={{
                employee_id: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSignIn}
            >
              {({ values }) => (
                <Form
                  style={{ textAlign: "left" }}
                  noValidate
                  autoComplete="off"
                >
                  <Div sx={{ mt: 1, mb: 3 }}>
                    <JumboTextField
                      fullWidth
                      size="medium"
                      name="employee_id"
                      label="Employee ID"
                    />
                  </Div>
                  <Div sx={{ mt: 1, mb: 2 }}>
                    <JumboTextField
                      fullWidth
                      size="medium"
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"} // Step 4
                    />
                  </Div>
                  <Div sx={{ mb: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showPassword}
                          onChange={() => setShowPassword(!showPassword)}
                        />
                      }
                      label="Show Password"
                    />
                  </Div>
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    size="medium"
                    type="submit"
                    sx={{ mb: 3, backgroundColor: "#F9D342", color: "black" }}
                    loading={isSubmitting}
                  >
                    Sign In
                  </LoadingButton>

                  {!disableSmLogin && (
                    <React.Fragment>
                      <Typography
                        variant={"body1"}
                        mb={2}
                        sx={{
                          "&:hover": { cursor: "pointer", color: "blue" },
                          width: "40%",
                        }}
                        onClick={handleForgotPassword}
                      >
                        Forgot Password?
                      </Typography>
                    </React.Fragment>
                  )}
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Div>
    </FullViewContent>
  );
};

export default Login;
