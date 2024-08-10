import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import AllApis from "app/Apis";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addBin } from "app/services/apis/addBin";
import { updateBin } from "app/services/apis/updateBin";
import { ErrorMessage, Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddBin() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [storageType, setStorageType] = useState([]);

  useEffect(() => {
    const fetchStorageTypes = async () => {
      const response = await Axios.get(AllApis.dropdownList.storage_type);
      setStorageType(response?.data?.result);
    };

    fetchStorageTypes();
  }, []);

  const bin = {
    storage_type: state?.storage_type || "Select",
    storage_section: state?.storage_section || "",
    bin_no: state?.bin_no || "",
    type: state?.type || "",
    description: state?.description || "",
    bin_capacity: state?.bin_capacity || "",
    digit_3_code: state?.digit_3_code || "",
  };

  const validationSchema = yup.object({
    storage_type: yup
      .string()
      .required("Storage Type is required")
      .test(
        "Storage-Type-not-select",
        "Please select a valid Storage Type",
        (value) => value !== "Select"
      ),
    storage_section: yup
      .string("Enter Storage Section")
      .required("Storage Section is required"),
    bin_no: yup.string("Enter Bin Number").required("Bin Number is required"),
    type: yup.string("Enter Type").required("Type is required"),
    description: yup
      .string("Enter Description")
      .required("Description is required"),
    bin_capacity: yup
      .string("Enter Bin Capacity")
      .required("Bin Capacity is required"),
    digit_3_code: yup
      .string("Enter 3 Digit Code")
      .required("3 Digit Code is required"),
  });

  const onUserSave = async (values) => {
    const body = { ...values };
    for (let key in body) {
      body[key] = body[key].toUpperCase();
    }

    setSubmitting(true);
    try {
      let data;
      if (pathname === "/master/bin/edit") {
        data = await updateBin(body, state._id);
      } else {
        data = await addBin(body);
      }

      if (data?.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: `Bin ${
            pathname === "/master/bin/edit" ? "Edited" : "Added"
          } Successfully`,
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/bin");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.data?.message || "An error occurred",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname === "/master/bin/add" ? "Add New Bin" : "Edit Bin"}
      </Typography>
      <Div>
        <Formik
          initialValues={bin}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onUserSave}
        >
          {({ values, setFieldValue }) => (
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
                    <Grid item xs={12} sm={6} md={4}>
                      <Div
                        sx={{
                          marginBottom: 2,
                          display: "flex",
                          width: "100%",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="h5">Storage Type *</Typography>
                        <Select
                          name="storage_type"
                          value={values.storage_type}
                          onChange={(event) =>
                            setFieldValue("storage_type", event.target.value)
                          }
                          sx={{
                            ".css-153xi1v-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                              { padding: 1.2 },
                          }}
                        >
                          <MenuItem value="Select">Select</MenuItem>
                          {storageType.map((item) => (
                            <MenuItem key={item._id} value={item.storage_type}>
                              {item.storage_type}
                            </MenuItem>
                          ))}
                        </Select>
                        <ErrorMessage
                          name="storage_type"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Div>
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1
                        name="storage_section"
                        label="Storage Section*"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="bin_no" label="Bin Number*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="description" label="Description*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1
                        name="bin_capacity"
                        label="Bin Capacity*"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1
                        name="digit_3_code"
                        label="3 Digit Code*"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1 name="type" label="Type*" />
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
                          navigate("/dashboard/master/bin");
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
