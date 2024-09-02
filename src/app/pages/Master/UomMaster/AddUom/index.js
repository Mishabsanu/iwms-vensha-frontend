import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { addUom } from "app/services/apis/addUom";
import { updateUom } from "app/services/apis/updateUom";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

// Validation schema
const validationSchema = yup.object({
  uom: yup.string("Enter UOM").required("UOM is required"),
});

export default function AddUom() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const uom = {
    uom: state?.uom || "",
    remarks: state?.remarks || "",
  };

  const onUomSave = async (values) => {
    const body = { ...values };

    setSubmitting(true);
    if (pathname === "/master/uom/edit") {
      const data = await updateUom(body, state._id);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Uom Edited Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/uom");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
        });
      }
    } else {
      const data = await addUom(body);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Uom Added Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/uom");
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
        {pathname === "/master/uom/add" ? "Add New UOM" : "Edit UOM"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={uom}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onUomSave}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={errors.uom}
                        helperText={errors.uom}
                        label="UOM*"
                        name="uom"
                        value={values.uom}
                        onChange={(e) => setFieldValue("uom", e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Remarks"
                        name="remarks"
                        value={values.remarks}
                        onChange={(e) =>
                          setFieldValue("remarks", e.target.value)
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
                          navigate("/dashboard/master/uom");
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
