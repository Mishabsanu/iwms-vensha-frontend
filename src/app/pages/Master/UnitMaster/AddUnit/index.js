import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addUnit } from "app/services/apis/addUnit";
import { updateUnit } from "app/services/apis/updateUnit";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddUnit() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const units = {
    unit_name: state?.unit_name ? state?.unit_name : "",
    unit_remarks: state?.unit_remarks ? state?.unit_remarks : "",
  };
  const validationSchema = yup.object({
    unit_name: yup.string("Enter Unit Name").required("Unit Name is required"),
  });
  const onUserSave = async (values) => {
    const body = { ...values };
    for (let key in body) {
      if (key != "unit_remarks") {
        body[key] = body[key].toUpperCase();
      }
    }
    setSubmitting(true);
    if (pathname == "/master/unit/edit") {
      const data = await updateUnit(body, state._id);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Unit Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/unit");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addUnit(body);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Unit Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/unit");
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
        {pathname == "/master/unit/add" ? "Add New Unit" : "Edit Unit"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={units}
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
                      <FormTextField1 name="unit_name" label="Unit Name*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="unit_remarks" label="Remarks" />
                    </Grid>
                  </Grid>
                  {/* <FormTextField name="unit_name" label="Unit Name" /> */}
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
                          navigate("/dashboard/master/unit");
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
