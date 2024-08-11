import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { addCrossDock } from "app/services/apis/addCrossDock";
import { updateCrossDock } from "app/services/apis/updateCrossDock";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddCrossDock() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);

  const pallets = {
    cross_dock_name: state?.cross_dock_name ? state?.cross_dock_name : "",
  };

  const validationSchema = yup.object({
    cross_dock_name: yup
      .string("Enter Cross Dock Name")
      .required("Cross Dock Name is required"),
  });

  const onCrossDockSave = async (values) => {
    const body = { ...values };
    setSubmitting(true);
    if (pathname === "/master/cross-dock/edit") {
      const data = await updateCrossDock(body, state._id);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Cross Dock Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/cross-dock");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addCrossDock(body);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Cross Dock Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/cross-dock");
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
        {pathname === "/master/cross-dock/add"
          ? "Add New Cross Dock"
          : "Edit Cross Dock"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={pallets}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onCrossDockSave}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={errors.cross_dock_name}
                        helperText={errors.cross_dock_name}
                        label="Cross Dock Name*"
                        name="cross_dock_name"
                        value={values.cross_dock_name}
                        onChange={(e) =>
                          setFieldValue("cross_dock_name", e.target.value)
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
                          navigate("/dashboard/master/pallet");
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
