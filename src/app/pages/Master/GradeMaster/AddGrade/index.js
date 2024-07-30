import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addGrade } from "app/services/apis/addGrade";
import { updateGrade } from "app/services/apis/updateGrade";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddGrade() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const grades = {
    grade_name: state?.grade_name ? state?.grade_name : "",
    grade_remarks: state?.grade_remarks ? state?.grade_remarks : "",
  };
  const validationSchema = yup.object({
    grade_name: yup
      .string("Enter Grade Name")
      .required("Grade Name is required"),
  });
  const onUserSave = async (values) => {
    const body = { ...values };
    for (let key in body) {
      if (key != "grade_remarks") {
        body[key] = body[key].toUpperCase();
      }
    }
    setSubmitting(true);
    if (pathname == "/master/grade/edit") {
      const data = await updateGrade(body, state._id);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Grade Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/grade");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addGrade(body);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Grade Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/grade");
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
        {pathname == "/master/grade/add" ? "Add New Grade" : "Edit Grade"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={grades}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onUserSave}
        >
          {({ values }) => (
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
                    <Grid item xs={4}>
                      <FormTextField1 name="grade_name" label="Grade Name*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="grade_remarks" label="Remarks" />
                    </Grid>
                  </Grid>
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
                          navigate("/dashboard/master/grade");
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
