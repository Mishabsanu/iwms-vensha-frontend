import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AllApis from "app/Apis";
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

import Select from "@mui/material/Select";
import { useTheme } from "@emotion/react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddProduction() {
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const { state, pathname } = useLocation();
  const [rowData, setRowData] = useState([]);
  const [selectedSku, setSelectedSku] = useState({});
  const [open, setOpen] = useState(false);
  const [loadingSkuOptions, setLoadingSkuOptions] = useState(false);
  const [assignedTo, setAssignedTo] = useState([]);
  const [productionLine, setProductionLine] = useState([]);
  const initialData = state || {};

  const user = {
    production_line: initialData?.production_line || "Select",
    process_order: initialData?.process_order || "",
    date: initialData?.date || "",
    sku_code: initialData?.sku_code || "",
    sku_description: initialData?.sku_description || "",
    sut: initialData?.sut || "",
    batch: initialData?.batch || "",
    pallete_qty: initialData?.pallete_qty || "",
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
    pallete_qty: yup.string().required("Pallet Qty is required"),
    process_order_qty: yup
      .string("Enter Process Order Qty")
      .required("Process Order Qty is required"),
    assigned_to: yup
      .array()
      .of(yup.string())
      .min(1, "At least one assignee is required")
      .required("Assigned To is required")
      .test("not-select", "Please select a valid Assignee", (value) =>
        value && value[0] !== "Select" ? true : false
      ),
  });
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
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  console.log(personName, "personName");
  const handleChange = (event, setFieldValue) => {
    const {
      target: { value },
    } = event;
    // Update the local state
    setPersonName(typeof value === "string" ? value.split(",") : value);
    // Update Formik field value
    if (setFieldValue) {
      setFieldValue(
        "assigned_to",
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const onUserSave = async (values) => {
    console.log(values, "values");

    const body = { ...values, assigned_to: personName };
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
    } catch (error) {
      console.error("Error fetching SKU options", error);
    } finally {
      setLoadingSkuOptions(false);
    }
  }, 300);

  const handleSkuInputChange = (event, setFieldValue) => {
    const query = event.target.value;
    fetchSkuOptions(query);
    setFieldValue("sku_code", query);
  };
  const handleSkuDesInputChange = (event, setFieldValue) => {
    const query = event.target.value;
    fetchSkuOptions(query);
    setFieldValue("sku_description", query);
  };

  const handleSelectSku = (sku, setFieldValue) => {
    setSelectedSku(sku);

    // Update form fields based on the selected SKU
    setFieldValue("sku_code", sku.sku_code);
    setFieldValue("sku_description", sku.sku_description);
    setFieldValue("sut", sku.sut);
    setFieldValue("pallete_qty", sku.pallete_qty);
    setOpen(false);
  };

  return (
    <Div sx={{ mt: 0 }}>
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
        >
          {({ values, setFieldValue, errors }) => (
            <Form>
              {console.log(values, "values")}
              <Div sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Production Line"
                        name="production_line"
                        value={values.production_line}
                        onChange={(e) =>
                          setFieldValue("production_line", e.target.value)
                        }
                        select
                        fullWidth
                        error={errors.production_line}
                        helperText={errors.production_line}
                        InputLabelProps={{
                          shrink: values.production_line,
                        }}
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {productionLine.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.production_line_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Process Order"
                        name="process_order"
                        value={values.process_order}
                        onChange={(e) =>
                          setFieldValue("process_order", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date"
                        name="date"
                        value={values.date ? dayjs(values.date) : null}
                        onChange={(date) =>
                          setFieldValue("date", date ? date.toISOString() : "")
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              style: { width: "100%" },
                            }}
                            sx={{
                              width: "100%", // Ensure the TextField takes full width
                              "& .MuiInputBase-root": {
                                width: "100%", // Ensure the inner input element takes full width
                              },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={3} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="SKU Code"
                        name="sku_code"
                        value={values.sku_code}
                        onChange={(e) => handleSkuInputChange(e, setFieldValue)}
                        onFocus={() => fetchSkuOptions(values.sku_code)}
                        InputProps={{
                          endAdornment: loadingSkuOptions ? (
                            <CircularProgress size={24} />
                          ) : null,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="SKU Description"
                        name="sku_description"
                        value={values.sku_description}
                        onChange={(e) =>
                          handleSkuDesInputChange(e, setFieldValue)
                        }
                        onFocus={() => fetchSkuOptions(values.sku_description)}
                        InputProps={{
                          endAdornment: loadingSkuOptions ? (
                            <CircularProgress size={24} />
                          ) : null,
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="SUT"
                        name="sut"
                        value={values.sut}
                        onChange={(e) => setFieldValue("sut", e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Pallete Qty"
                        name="pallete_qty"
                        value={values.pallete_qty}
                        onChange={(e) =>
                          setFieldValue("pallete_qty", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Batch"
                        name="batch"
                        value={values.batch}
                        onChange={(e) => setFieldValue("batch", e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={errors.process_order_qty}
                        helperText={errors.process_order_qty}
                        label="Process Order Qty"
                        name="process_order_qty"
                        value={values.process_order_qty}
                        onChange={(e) =>
                          setFieldValue("process_order_qty", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-name-label">
                        Assigned To
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={personName}
                        onChange={(event) => {
                          handleChange(event, setFieldValue);
                        }}
                        input={<OutlinedInput label="Assigned To" />}
                        MenuProps={MenuProps}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {assignedTo.map((item) => (
                          <MenuItem
                            key={item._id}
                            value={item._id}
                            style={getStyles(item, values.assigned_to, theme)}
                          >
                            {`${item.first_name} ${item.last_name}`}
                          </MenuItem>
                        ))}
                      </Select>
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
              <SkuDetails
                open={open}
                setOpen={setOpen}
                rowData={rowData}
                onSelect={(sku) => handleSelectSku(sku, setFieldValue)}
              />
            </Form>
          )}
        </Formik>
      </Div>
    </Div>
  );
}
