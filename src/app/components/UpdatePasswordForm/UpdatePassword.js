import React from "react";
import * as yup from "yup";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { Field, Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import JumboAvatarField from "@jumbo/components/JumboFormik/JumboAvatarField";
import Div from "@jumbo/shared/Div";
import { updateUserDetailsAdmin } from "app/services/apis/updateUserDetailsAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, loadUser } from "app/redux/actions/userAction";
import { Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { addUser } from "app/services/apis/addUser";
import { updateUserDetails } from "app/services/apis/updateUserDetails";
import { updatePassword } from "app/services/apis/updatePassword";

const validationSchema = yup.object({
  oldPassword: yup
    .string("Enter Old Password")
    .required("Old Password is required"),
  password: yup
    .string("Enter New Password")
    .required("New Password is required"),
  confirmPassword: yup
    .string("Enter New Password")
    .required("Confirm New Password is required"),
});
const initialValues = {
  name: "",
  phone: "",
  role: "",
  email: "",
  profile_pic: "",
  password: "",
  confirmPassword: "",
  oldPassword: "",
};

const UpdatePasswordForm = ({ onSave }) => {
  const Swal = useSwalWrapper();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const onUserSave = async (data, { setSubmitting }) => {
    // console.log(data)
    const userId = user._id;
    let user_updated = await updatePassword(data, userId);
    // console.log(user_updated);
    if (user_updated?.status == 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Password Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      onSave();
      dispatch(loadUser());
    }
    if (user_updated?.success == false) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Credentials",
        showConfirmButton: false,
        timer: 1500,
      });
      onSave();
    }
  };
  return (
    <Formik
      validateOnChange={true}
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={onUserSave}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form noValidate autoComplete="off">
          <Div
            sx={{
              "& .MuiTextField-root": {
                mb: 3,
              },
              p: 5,
            }}
          >
            <JumboTextField
              fullWidth
              size="small"
              variant="outlined"
              name="oldPassword"
              label="Old Password"
            />
            <JumboTextField
              fullWidth
              size="small"
              variant="outlined"
              name="password"
              label="New Password"
            />
            <JumboTextField
              fullWidth
              size="small"
              variant="outlined"
              name="confirmPassword"
              label="Confirm New Password"
            />
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mb: 3 }}
              loading={isSubmitting}
            >
              Save
            </LoadingButton>
          </Div>
        </Form>
      )}
    </Formik>
  );
};
UpdatePasswordForm.defaultProps = {
  onSave: () => {},
};
export default UpdatePasswordForm;
