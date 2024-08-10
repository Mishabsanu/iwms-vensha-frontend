import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Grid,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import { addProductionLine } from "app/services/apis/addProductionLine";
import { updatePallet } from "app/services/apis/updatePallet";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

// Validation schema
const validationSchema = yup.object({
  production_line_name: yup
    .string("Enter Production Line Name")
    .required("Production Line Name is required"),
  production_line_description: yup.string("Enter Production Line Description"),
});

export default function AddProductionLine() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);

  const pallets = {
    production_line_name: state?.production_line_name || "",
    production_line_description: state?.production_line_description || "",
  };

  const onPalleteSave = async (values) => {
    const body = { ...values };
    for (let key in body) {
      if (key !== "production_line_description") {
        body[key] = body[key].toUpperCase();
      }
    }
    setSubmitting(true);
    if (pathname === "/master/production-line/edit") {
      const data = await updatePallet(body, state._id);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Production Line Edited Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/production-line");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
        });
      }
    } else {
      const data = await addProductionLine(body);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Production Line Added Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/production-line");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.data?.message,
        });
      }
    }
    setSubmitting(false);
  };

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname === "/master/production-line/add"
          ? "Add New Production Line"
          : "Edit Production Line"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={pallets}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onPalleteSave}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={errors.production_line_name}
                        helperText={errors.production_line_name}
                        label="Production Line Name*"
                        name="production_line_name"
                        value={values.production_line_name}
                        onChange={(e) =>
                          setFieldValue("production_line_name", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.production_line_description &&
                          errors.production_line_description
                      )}
                    >
                      <TextField
                        label="Production Line Description"
                        name="production_line_description"
                        value={values.production_line_description}
                        onChange={(e) =>
                          setFieldValue(
                            "production_line_description",
                            e.target.value
                          )
                        }
                        helperText={
                          touched.production_line_description &&
                          errors.production_line_description
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>

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
                          navigate("/dashboard/master/production-line");
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
