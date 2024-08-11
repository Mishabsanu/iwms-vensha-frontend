import Div from "@jumbo/shared/Div";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

import { LoadingButton } from "@mui/lab";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { useState } from "react";
import { updateStorageType } from "app/services/apis/updateStorageType";
import { addStorageType } from "app/services/apis/addStorageType";

export default function AddStorageType() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const party = {
    storage_type: state?.storage_type ? state?.storage_type : "",
    storage_type_description: state?.storage_type_description
      ? state?.storage_type_description
      : "",
  };
  const validationSchema = yup.object({
    storage_type: yup
      .string("Enter Storage type")
      .required("Storage type is required"),
    storage_type_description: yup
      .string("Enter storage type description")
      .required("storage type description is required"),
  });
  const onUserSave = async (values) => {
    setSubmitting(true);
    if (pathname == "/master/storage-type/edit") {
      const data = await updateStorageType(values, state._id);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Storage Type Edited Successfully",
          text: "",
        });
        navigate("/dashboard/master/storage-type");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addStorageType(values);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Storage Type Added Successfully",
          text: "",
        });
        navigate("/dashboard/master/storage-type");
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
        {pathname == "/master/storage-type/add"
          ? "Add New Storage Type"
          : "Edit Storage Type"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={party}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onUserSave}
        >
          {({ values, setFieldValue, errors }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={errors.storage_type}
                        helperText={errors.storage_type}
                        label="Storage Type *"
                        name="storage_type"
                        value={values.storage_type}
                        onChange={(e) =>
                          setFieldValue("storage_type", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={errors.storage_type_description}
                        helperText={errors.storage_type_description}
                        label="Storage Type Description"
                        name="storage_type_description"
                        value={values.storage_type_description}
                        onChange={(e) =>
                          setFieldValue(
                            "storage_type_description",
                            e.target.value
                          )
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
                          navigate("/dashboard/master/storage-type");
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
