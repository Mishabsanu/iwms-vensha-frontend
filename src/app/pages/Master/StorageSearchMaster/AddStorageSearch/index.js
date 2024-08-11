import Div from "@jumbo/shared/Div";
import {
  Button,
  Grid,
  Typography,
  IconButton,
  FormControl,
  TextField,
} from "@mui/material";
import { Form, Formik, FieldArray } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useState } from "react";
import { updateStorageSearch } from "app/services/apis/updateStorageSearch";
import { addStorageSearch } from "app/services/apis/addStorageSearch";

export default function AddStorageSearch() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    sku_group: state?.sku_group || "",
    ssi: state?.ssi || "",
    storage_sections: state?.storage_sections || [""],
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
    try {
      const data =
        pathname === "/master/storage-search/edit"
          ? await updateStorageSearch(values, state?._id)
          : await addStorageSearch(values);

      if (data?.data?.status) {
        Swal.fire({
          icon: "success",
          title:
            pathname === "/master/storage-search/edit"
              ? "Storage Search Edited Successfully"
              : "Storage Search Added Successfully",
        });
        navigate("/dashboard/master/storage-search");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.data?.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname === "/master/storage-search/add"
          ? "Add New Storage Search"
          : "Edit Storage Search"}
      </Typography>
      <Div sx={{ mt: 4 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onUserSave}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mb: 4 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(touched.sku_group && errors.sku_group)}
                        helperText={touched.sku_group && errors.sku_group}
                        label="SKU Group*"
                        name="sku_group"
                        value={values.sku_group}
                        onChange={(e) =>
                          setFieldValue("sku_group", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={Boolean(touched.ssi && errors.ssi)}
                        helperText={touched.ssi && errors.ssi}
                        label="SSI*"
                        name="ssi"
                        value={values.ssi}
                        onChange={(e) => setFieldValue("ssi", e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Div>

              <FieldArray name="storage_sections">
                {({ push, remove }) => (
                  <Div sx={{ mb: 4 }}>
                    {values.storage_sections.map((_, index) => (
                      <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={3}
                        key={index}
                        sx={{ mt:0.5}} 
                      >
                        <Grid item xs={12} md={6} lg={3}>
                          <FormControl fullWidth>
                            <TextField
                              error={Boolean(
                                touched.storage_sections?.[index] &&
                                  errors.storage_sections?.[index]
                              )}
                              helperText={
                                touched.storage_sections?.[index] &&
                                errors.storage_sections?.[index]
                              }
                              label={`Storage Sec ${index + 1}`}
                              name={`storage_sections[${index}]`}
                              value={values.storage_sections[index]}
                              onChange={(e) =>
                                setFieldValue(
                                  `storage_sections[${index}]`,
                                  e.target.value
                                )
                              }
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={1} lg={1}>
                          <IconButton
                            sx={{
                              mt: 2,
                              color: "red",
                              borderColor: "red",
                              "&:hover": {
                                borderColor: "darkred",
                                color: "darkred",
                              },
                            }}
                            onClick={() => remove(index)}
                            disabled={values.storage_sections.length === 1}
                          >
                            <RemoveCircleIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => push("")}
                      sx={{ mt: 2 }} // Margin top for button
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
                        navigate("/dashboard/master/storage-search");
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
            </Form>
          )}
        </Formik>
      </Div>
    </Div>
  );
}
