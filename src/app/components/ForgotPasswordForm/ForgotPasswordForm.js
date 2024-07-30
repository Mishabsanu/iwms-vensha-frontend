import React, { useState } from "react";
import * as yup from "yup";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { Field, Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import { sendResetMail } from "app/services/apis/sendResetMail";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email_id: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});
const initialValues = {
  email_id: "",
};

const ForgotPasswordForm = ({ user, onSave, hideDialogue }) => {
  const Swal = useSwalWrapper();

  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);

  const onUserSave = async (data) => {
    setSubmitting(true);
    let user_updated = [];
    user_updated = await sendResetMail(data);
    if (user_updated?.status == 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Mail Sent Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/password/otp");
    }
    if (user_updated?.success == false) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Email Id Doesnt Exists",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setSubmitting(false);
    hideDialogue();
    onSave();
  };
  return (
    <Formik
      validateOnChange={true}
      initialValues={user ? user : initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={onUserSave}
    >
      {({}) => (
        <Form noValidate autoComplete="off">
          <Div
            sx={{
              "& .MuiTextField-root": {
                mb: 3,
              },
              padding: 5,
            }}
          >
            <JumboTextField
              fullWidth
              size="small"
              variant="outlined"
              name="email_id"
              label="Email"
            />
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mb: 3 }}
              loading={isSubmitting}
            >
              Send Email
            </LoadingButton>
          </Div>
        </Form>
      )}
    </Formik>
  );
};
ForgotPasswordForm.defaultProps = {
  onSave: () => {},
};
export default ForgotPasswordForm;
