import Div from "@jumbo/shared/Div";
import { Button, Grid, Typography, IconButton } from "@mui/material";
import { Form, Formik, FieldArray } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { useState } from "react";
import { addStorageSearch } from "app/services/apis/addStorageSearch";
import { updateStorageSearch } from "app/services/apis/updateStorageSearch";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function AddStorageSearch() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    sku_group: state?.sku_group ? state?.sku_group : "",
    ssi: state?.ssi ? state?.ssi : "",
    storage_sections: state?.storage_sections ? state?.storage_sections : [""],
  };

  const validationSchema = yup.object({
    sku_group: yup.string().required("Sku Group is required"),
    ssi: yup.string().required("SSI is required"),
    storage_sections: yup
      .array()
      .of(yup.string().required("Storage Section is required")),
  });

  const onUserSave = async (values) => {
    setSubmitting(true);
    if (pathname === "/master/storage-search/edit") {
      const data = await updateStorageSearch(values, state?._id);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Storage Search Edited Successfully",
        });
        navigate("/dashboard/master/storage-search");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
        });
      }
    } else {
      const data = await addStorageSearch(values);
      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Storage Search Added Successfully",
        });
        navigate("/dashboard/master/storage-search");
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
        {pathname === "/master/storage-search/add"
          ? "Add New Storage Search"
          : "Edit Storage Search"}
      </Typography>
      <Div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onUserSave}
        >
          {({ values, errors, touched }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormTextField1 name="sku_group" label="Sku Group*" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormTextField1 name="ssi" label="SSI*" />
                  </Grid>
                </Grid>
                <FieldArray name="storage_sections">
                  {({ push, remove }) => (
                    <Div sx={{ mt: 4 }}>
                      {values.storage_sections.map((_, index) => (
                        <Grid
                          container
                          rowSpacing={3}
                          columnSpacing={3}
                          key={index}
                        >
                          <Grid item xs={12} md={6} lg={3}>
                            <FormTextField1
                              name={`storage_sections[${index}]`}
                              label={`Storage Sec ${index + 1}`}
                            />
                          </Grid>
                          <Grid item xs={12} md={1} lg={1}>
                            <IconButton
                              onClick={() => remove(index)}
                              disabled={values.storage_sections.length === 1} // Prevent removing the last element
                            >
                              <RemoveIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => push("")}
                        sx={{ mt: 2 }}
                      >
                        Add Storage Section
                      </Button>
                    </Div>
                  )}
                </FieldArray>
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
