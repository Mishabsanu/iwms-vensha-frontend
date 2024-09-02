import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AllApis from "app/Apis";
import { addBin } from "app/services/apis/addBin";
import { updateBin } from "app/services/apis/updateBin";
import { Form, Formik } from "formik";
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
  const [binType, setBinType] = useState([]);

  useEffect(() => {
    const fetchStorageTypes = async () => {
      const response = await Axios.get(AllApis?.dropdownList?.storage_type);
      setStorageType(response?.data?.result);
      const BinTypeResponse = await Axios.get(AllApis?.dropdownList?.bin_type);
      setBinType(BinTypeResponse?.data?.result);
    };

    fetchStorageTypes();
  }, []);

  const bin = {
    storage_type: state?.storage_type || "",
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
          {({ values, setFieldValue, errors, touched }) => (
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
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          label="Storage Type"
                          name="storage_type"
                          value={values?.storage_type}
                          onChange={(e) =>
                            setFieldValue("storage_type", e.target.value)
                          }
                          select
                          fullWidth
                          error={errors?.storage_type}
                          helperText={errors?.storage_type}
                          InputLabelProps={{
                            shrink: values?.storage_type,
                          }}
                          SelectProps={{
                            native: false,
                          }}
                        >
                          <MenuItem value="Select">Select</MenuItem>
                          {storageType.map((item) => (
                            <MenuItem key={item?._id} value={item?.storage_type}>
                              {item?.storage_type}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={
                            touched?.storage_section &&
                            Boolean(errors?.storage_section)
                          }
                          helperText={
                            touched?.storage_section && errors?.storage_section
                          }
                          label="Storage Section*"
                          name="storage_section"
                          value={values.storage_section}
                          onChange={(e) =>
                            setFieldValue("storage_section", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={touched?.bin_no && Boolean(errors?.bin_no)}
                          helperText={touched?.bin_no && errors?.bin_no}
                          label="Bin Number*"
                          name="bin_no"
                          value={values.bin_no}
                          onChange={(e) =>
                            setFieldValue("bin_no", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={
                            touched?.description && Boolean(errors?.description)
                          }
                          helperText={touched?.description && errors?.description}
                          label="Description*"
                          name="description"
                          value={values?.description}
                          onChange={(e) =>
                            setFieldValue("description", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={
                            touched?.bin_capacity && Boolean(errors?.bin_capacity)
                          }
                          helperText={
                            touched?.bin_capacity && errors?.bin_capacity
                          }
                          label="Bin Capacity*"
                          name="bin_capacity"
                          value={values?.bin_capacity}
                          onChange={(e) =>
                            setFieldValue("bin_capacity", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={
                            touched?.digit_3_code && Boolean(errors?.digit_3_code)
                          }
                          helperText={
                            touched?.digit_3_code && errors?.digit_3_code
                          }
                          label="3 Digit Code*"
                          name="digit_3_code"
                          value={values?.digit_3_code}
                          onChange={(e) =>
                            setFieldValue("digit_3_code", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          label="Bin Type"
                          name="type"
                          value={values?.type}
                          onChange={(e) =>
                            setFieldValue("type", e.target.value)
                          }
                          select
                          fullWidth
                          error={errors?.type}
                          helperText={errors?.type}
                          InputLabelProps={{
                            shrink: values?.type,
                          }}
                          SelectProps={{
                            native: false,
                          }}
                        >
                          <MenuItem value="Select">Select</MenuItem>
                          {binType?.map((item) => (
                            <MenuItem key={item?._id} value={item?._id}>
                              {item?.type}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
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
