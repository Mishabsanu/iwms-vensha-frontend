import Div from "@jumbo/shared/Div";
import { Button, Grid, Typography } from "@mui/material";
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
                    <Grid item xs={12} md={6} lg={3}>
                      <FormTextField1
                        name="storage_type"
                        label="Storage Type *"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <FormTextField1
                        name="storage_type_description"
                        label="Storage Type Description"
                      />
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
                          navigate("/dashboard/master/party");
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
