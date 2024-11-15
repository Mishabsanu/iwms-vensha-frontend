import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Grid,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import { addCustomerType } from "app/services/apis/addCustomerType";
import { addProductionLine } from "app/services/apis/addProductionLine";
import { updateCustomerType } from "app/services/apis/updateCustomerType";
import { updatePallet } from "app/services/apis/updatePallet";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

const validationSchema = yup.object({
  type: yup.string("Enter Type").required("Type is required"),
  discount: yup.string("Enter Discount"),
});

export default function AddCustomerType() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);

  const pallets = {
    type: state?.type || "",
    discount: state?.discount || "",
  };

  const onPalleteSave = async (values) => {
    const body = { ...values };
    for (let key in body) {
      if (key !== "discount") {
        body[key] = body[key].toUpperCase();
      }
    }
    setSubmitting(true);
    if (pathname === "/master/customer-type/edit") {
      const data = await updateCustomerType(body, state._id);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Customer Type Edited Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/customer-type");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
        });
      }
    } else {
      const data = await addCustomerType(body);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Customer Type Added Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/customer-type");
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
        {pathname === "/master/customer-type/add"
          ? "Add New Customer Type"
          : "Edit Customer Type"}
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
                        error={errors.type}
                        helperText={errors.type}
                        label="Type*"
                        name="type"
                        value={values.type}
                        onChange={(e) => setFieldValue("type", e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.discount && errors.discount)}
                    >
                      <TextField
                        label="Discount"
                        name="discount"
                        value={values.discount}
                        onChange={(e) =>
                          setFieldValue("discount", e.target.value)
                        }
                        helperText={touched.discount && errors.discount}
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
                          navigate("/dashboard/master/customer-type");
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
