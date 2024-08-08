import Div from "@jumbo/shared/Div/Div";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AllApis from "app/Apis";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addProduction } from "app/services/apis/addProduction";
import { updateProduction } from "app/services/apis/updateProduction";
import dayjs from "dayjs";
import { ErrorMessage, Form, Formik } from "formik";
import { Axios } from "index";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { SkuDetails } from "../Modal/skuDetails";

export default function AddProduction() {
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const { state, pathname } = useLocation();
  const [productionLine, setProductionLine] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [skuOptions, setSkuOptions] = useState([]);
  const [loadingSkuOptions, setLoadingSkuOptions] = useState(false);
  const [sutOptions, setSutOptions] = useState([]);
  const [skuDescription, setSkuDescription] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const initialData = state || {};

  const user = {
    production_line: initialData?.production_line || "Select",
    process_order: initialData?.process_order || "",
    date: initialData?.date || "",
    sku_code: initialData?.sku_code || "",
    sku_description: initialData?.sku_description || "",
    sut: initialData?.sut || "",
    batch: initialData?.batch || "",
    process_order_qty: initialData?.process_order_qty || "",
    assigned_to: initialData?.assigned_to || "Select",
  };

  const validationSchema = yup.object({
    production_line: yup
      .string()
      .required("Production Line is required")
      .notOneOf(["Select"], "Please select a valid Production Line"),
    process_order: yup.string().required("Process Order is required"),
    date: yup.string().required("Date is required"),
    sku_code: yup.string().required("SKU Code is required"),
    sku_description: yup.string().required("SKU Description is required"),
    sut: yup.string().required("SUT is required"),
    batch: yup.string().required("Batch is required"),
    process_order_qty: yup.string().required("Process Order Qty is required"),
    assigned_to: yup
      .string()
      .required("Assigned To is required")
      .notOneOf(["Select"], "Please select a valid Assignee"),
  });

  const onUserSave = async (values) => {
    const body = { ...values };
    setSubmitting(true);
    try {
      const response =
        pathname === "/dashboard/editproduction"
          ? await updateProduction({ ...body, id: state._id })
          : await addProduction(body);

      const successMessage =
        pathname === "/dashboard/editproduction"
          ? "Production Edited Successfully"
          : "Production Added Successfully";
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: successMessage,
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/warehouseexecutive/production");
      } else {
        Swal.fire({
          icon: "error",
          title: response?.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error?.message || "An error occurred",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fetchSkuOptions = debounce(async (query) => {
    setLoadingSkuOptions(true);
    try {
      const response = await Axios.get(
        `${AllApis.dropdownList.skuSearch}?q=${query}`
      );
      setOpen(true);
      setRowData(response.data.data || []);
      // setSkuOptions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching SKU options", error);
    } finally {
      setLoadingSkuOptions(false);
    }
  }, 300);

  const fetchSkuDetails = async (skuCode) => {
    try {
      const response = await Axios.get(
        `${AllApis.dropdownList.skuDetails(skuCode)}`
      );

      const { uniqueSkuCodes, uniqueSkuDecrs, uniqueSuts } = response.data.data;

      setSkuDescription(uniqueSkuDecrs || []);
      setSutOptions(uniqueSuts || []);
    } catch (error) {
      console.error("Error fetching SKU details:", error);
    }
  };

  const handleSkuInputChange = (event, setFieldValue) => {
    const query = event.target.value;
    setFieldValue("sku_code", query);
    if (query.length > 2) {
      fetchSkuOptions(query);
    }
  };

  const handleSkuSelect = async (event, value, setFieldValue) => {
    if (value) {
      setFieldValue("sku_code", value);
      await fetchSkuDetails(value);
    }
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const productionLineResponse = await Axios.get(
          `${AllApis.dropdownList.productionLine}`
        );
        setProductionLine(productionLineResponse.data.result);

        const assignedToResponse = await Axios.get(
          `${AllApis.dropdownList.assignedTo}`
        );
        setAssignedTo(assignedToResponse.data.result);
      } catch (error) {
        console.error("Error fetching dropdown data", error);
      }
    };

    fetchDropdownData();
  }, []);

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname === "/dashboard/addproduction"
          ? "Add New Production"
          : "Edit Production"}
      </Typography>
      <Div>
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={onUserSave}
          enableReinitialize
        >
          {({ setFieldValue, values }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h5">Production Line*</Typography>
                    <Select
                      name="production_line"
                      value={values.production_line}
                      onChange={(event) =>
                        setFieldValue("production_line", event.target.value)
                      }
                      fullWidth
                      sx={{
                        mt: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "4px",
                        },
                      }}
                    >
                      <MenuItem value="Select">Select</MenuItem>
                      {productionLine.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.production_line_name}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage
                      name="production_line"
                      component="div"
                      style={{ color: "red", marginTop: "4px" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <FormTextField1
                      name="process_order"
                      label="Process Order*"
                      fullWidth
                      sx={{ mt: 1 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h5">Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input": { padding: 1 },
                          mt: 1,
                        }}
                        format="DD-MM-YYYY"
                        value={values.date ? dayjs(values.date) : null}
                        onChange={(newValue) =>
                          setFieldValue(
                            "date",
                            newValue
                              ? newValue
                                  .startOf("day")
                                  .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                              : null
                          )
                        }
                      />
                    </LocalizationProvider>
                    <ErrorMessage
                      name="date"
                      component="div"
                      style={{ color: "red", marginTop: "4px" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h5">SKU Code*</Typography>
                    <Autocomplete
                      options={skuOptions}
                      getOptionLabel={(option) => option}
                      onInputChange={(event, newInputValue) => {
                        handleSkuInputChange(event, setFieldValue);
                      }}
                      onChange={(event, value) =>
                        handleSkuSelect(event, value, setFieldValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 1 }}
                        />
                      )}
                      loading={loadingSkuOptions}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h5">SKU Description*</Typography>
                    <Select
                      name="sku_description"
                      value={values.sku_description}
                      onChange={(event) =>
                        setFieldValue("sku_description", event.target.value)
                      }
                      fullWidth
                      displayEmpty
                      sx={{ mt: 1 }}
                    >
                      {skuDescription.map((des) => (
                        <MenuItem key={des} value={des}>
                          {des}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h5">SUT*</Typography>
                    <Select
                      name="sut"
                      value={values.sut}
                      onChange={(event) =>
                        setFieldValue("sut", event.target.value)
                      }
                      fullWidth
                      displayEmpty
                      sx={{ mt: 1 }}
                    >
                      {sutOptions.map((sut) => (
                        <MenuItem key={sut} value={sut}>
                          {sut}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <FormTextField1
                      name="batch"
                      label="Batch *"
                      fullWidth
                      sx={{ mt: 1 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <FormTextField1
                      name="process_order_qty"
                      label="Process Order Qty *"
                      fullWidth
                      sx={{ mt: 1 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h5">Assigned To*</Typography>
                    <Select
                      name="assigned_to"
                      value={values.assigned_to}
                      onChange={(event) =>
                        setFieldValue("assigned_to", event.target.value)
                      }
                      fullWidth
                      sx={{ mt: 1 }}
                    >
                      <MenuItem value="Select">Select</MenuItem>
                      {assignedTo.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {`${item.first_name} ${item.last_name}`}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage
                      name="assigned_to"
                      component="div"
                      style={{ color: "red", marginTop: "4px" }}
                    />
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
                          navigate("/dashboard/user");
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
        {open && <SkuDetails open={open} setOpen={setOpen} rowData={rowData} />}
        {/* <SkuDetails open={openSkuDetails} setOpen={setOpenSkuDetails} rowData={rowData} onSelect={handleSelectSkuDetails} /> */}
      </Div>
    </Div>
  );
}
