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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AllApis from "app/Apis";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { Axios } from "index";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

import { addOutbound } from "app/services/apis/addOutbound";
import { updateOutbound } from "app/services/apis/updateOutbound";
import { SkuDetails } from "../Modal/skuDetails";

export default function AddOutbound() {
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const { state, pathname } = useLocation();
  const [rowData, setRowData] = useState([]);
  const [selectedSku, setSelectedSku] = useState({});
  const [open, setOpen] = useState(false);
  const [loadingSkuOptions, setLoadingSkuOptions] = useState(false);
  const [customer, setCustomer] = useState([]);
  const data = state;

  const user = {
    date: data?.date || null,
    order_type: data?.order_type || "select",
    entity_name: data?.entity_name || data?.entity_name || "Select",
    sku_code: data?.sku_code || "",
    sku_description: data?.sku_description || "",
    sut: data?.sut || "",
    stock_qty: data?.stock_qty || "",
  };
  const validationSchema = yup.object({
    date: yup.string().required("Date is required"),
    // order_number: yup.string().required("Order Number is required"),
    entity_name: yup
      .string()
      .required(
        data?.order_type === "STO"
          ? "Plant Name is required"
          : "Customer Name is required"
      )
      .test(
        "entity-name-not-select",
        `Please select a valid ${
          data?.order_type === "STO" ? "Plant Name" : "Customer Name"
        }`,
        (value) => value !== "Select"
      ),
    sku_code: yup.string().required("SKU Code is required"),
    stock_qty: yup.string().required("Stock Qty is required"),
    sut: yup.string().required("sut is required"),
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const customerResponse = await Axios.get(
          `${AllApis.dropdownList.customer}`
        );
        setCustomer(customerResponse.data.result);
      } catch (error) {
        console.error("Error fetching dropdown data", error);
      }
    };

    fetchDropdownData();
  }, []);

  const onUserSave = async (values) => {
    const body = { ...values };
    setSubmitting(true);
    try {
      const response =
        pathname === "/dashboard/editoutbound"
          ? await updateOutbound({ ...body, id: state._id })
          : await addOutbound(body);

      const successMessage =
        pathname === "/dashboard/editoutbound"
          ? "Outbound Edited Successfully"
          : "Outbound Added Successfully";
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: successMessage,
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/warehouseexecutive/outbound");
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
    setOpen(false);
  };

  return (
    <Div sx={{ mt: 0 }}>
      <Typography variant="h1">
        {pathname === "/dashboard/addoutbound"
          ? "Add New Outbound"
          : "Edit Outbound"}
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
                        label="Order Type *"
                        name="order_type"
                        value={values.order_type}
                        onChange={(e) =>
                          setFieldValue("order_type", e.target.value)
                        }
                        select
                        fullWidth
                        error={errors.order_type}
                        helperText={errors.order_type}
                        InputLabelProps={{
                          shrink: values.order_type,
                        }}
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        <MenuItem value="SO">SO</MenuItem>
                        <MenuItem value="STO">STO</MenuItem>
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        label={
                          values.order_type === "STO"
                            ? "Plant Name *"
                            : "Customer Name *"
                        }
                        name="entity_name"
                        value={values.entity_name}
                        onChange={(e) =>
                          setFieldValue("entity_name", e.target.value)
                        }
                        select
                        fullWidth
                        error={errors.entity_name}
                        helperText={errors.entity_name}
                        InputLabelProps={{
                          shrink: values.entity_name,
                        }}
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {customer.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item?.customer_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
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
                        label="Stock Qty"
                        name="stock_qty"
                        value={values.stock_qty}
                        onChange={(e) =>
                          setFieldValue("stock_qty", e.target.value)
                        }
                      />
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
