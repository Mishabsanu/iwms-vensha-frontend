import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AllApis from "app/Apis";
import dayjs from "dayjs";
import { Form, Formik, FieldArray } from "formik";
import { Axios } from "index";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

import { addOutbound } from "app/services/apis/addOutbound";
import { updateOutbound } from "app/services/apis/updateOutbound";
import { SkuDetails } from "../Modal/skuDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function AddOutbound() {
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const { state, pathname } = useLocation();
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loadingSkuOptions, setLoadingSkuOptions] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [skuIndexForModal, setSkuIndexForModal] = useState(null);
  const data = state;

  const user = {
    date: data?.date || null,
    order_type: data?.order_type || "",
    entity_name: data?.entity_name || "",
    skus:
      data?.skus?.length > 0
        ? data.skus
        : [
            {
              sku_code: "",
              sku_description: "",
              sut: "",
              stock_qty: "",
            },
          ],
  };

  const validationSchema = yup.object({
    date: yup.string().required("Date is required"),
    order_type: yup.string().required("Order Type is required"),
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
    skus: yup.array().of(
      yup.object().shape({
        sku_code: yup.string().required("SKU Code is required"),
        sku_description: yup.string().required("SKU Description is required"),
        sut: yup.string().required("SUT is required"),
        stock_qty: yup
          .number()
          .required("Stock Qty is required")
          .min(1, "Stock Qty must be at least 1"),
      })
    ),
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

  const fetchSkuOptions = debounce(async (query, index) => {
    setLoadingSkuOptions(true);
    try {
      const response = await Axios.get(
        `${AllApis.dropdownList.skuSearch}?q=${query}`
      );
      setSkuIndexForModal(index);
      setOpen(true);
      setRowData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching SKU options", error);
    } finally {
      setLoadingSkuOptions(false);
    }
  }, 300);

  const handleSkuInputChange = (event, setFieldValue, index) => {
    const query = event.target.value;
    fetchSkuOptions(query, index);
    setFieldValue(`skus[${index}].sku_code`, query);
  };

  const handleSkuDesInputChange = (event, setFieldValue, index) => {
    const query = event.target.value;
    fetchSkuOptions(query, index);
    setFieldValue(`skus[${index}].sku_description`, query);
  };

  const handleSelectSku = (sku, setFieldValue) => {
    if (skuIndexForModal !== null) {
      setFieldValue(`skus[${skuIndexForModal}].sku_code`, sku.sku_code);
      setFieldValue(
        `skus[${skuIndexForModal}].sku_description`,
        sku.sku_description
      );
      setFieldValue(`skus[${skuIndexForModal}].sut`, sku.sut);
      setOpen(false);
      setSkuIndexForModal(null);
    }
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
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <Div sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
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
                            error={touched.date && Boolean(errors.date)}
                            helperText={touched.date && errors.date}
                          />
                        )}
                        sx={{ width: "100%" }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={4}>
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
                        error={touched.order_type && Boolean(errors.order_type)}
                        helperText={touched.order_type && errors.order_type}
                        InputLabelProps={{
                          shrink: values.order_type ? true : false,
                        }}
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="SO">SO</MenuItem>
                        <MenuItem value="STO">STO</MenuItem>
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                        error={
                          touched.entity_name && Boolean(errors.entity_name)
                        }
                        helperText={touched.entity_name && errors.entity_name}
                        InputLabelProps={{
                          shrink: values.entity_name ? true : false,
                        }}
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="">Select</MenuItem>
                        {customer.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item?.customer_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                </Grid>
              </Div>

              <Div sx={{ mt: 4 }}>
                <Typography variant="h4">SKU Details</Typography>
                <FieldArray name="skus">
                  {({ push, remove }) => (
                    <>
                      {values.skus.map((sku, index) => (
                        <Grid
                          container
                          spacing={2}
                          // gap={2}
                          sx={{ mt: 1 }}
                          key={index}
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                              <TextField
                                label="SKU Code"
                                name={`skus[${index}].sku_code`}
                                value={sku.sku_code}
                                onChange={(e) =>
                                  handleSkuInputChange(e, setFieldValue, index)
                                }
                                error={
                                  touched.skus &&
                                  touched.skus[index] &&
                                  touched.skus[index].sku_code &&
                                  Boolean(errors.skus?.[index]?.sku_code)
                                }
                                helperText={
                                  touched.skus &&
                                  touched.skus[index] &&
                                  touched.skus[index].sku_code &&
                                  errors.skus?.[index]?.sku_code
                                }
                                InputProps={{
                                  endAdornment: loadingSkuOptions ? (
                                    <CircularProgress size={24} />
                                  ) : null,
                                }}
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                              <TextField
                                label="SKU Description"
                                name={`skus[${index}].sku_description`}
                                value={sku.sku_description}
                                onChange={(e) =>
                                  handleSkuDesInputChange(
                                    e,
                                    setFieldValue,
                                    index
                                  )
                                }
                                error={
                                  touched.skus &&
                                  touched.skus[index] &&
                                  touched.skus[index].sku_description &&
                                  Boolean(errors.skus?.[index]?.sku_description)
                                }
                                helperText={
                                  touched.skus &&
                                  touched.skus[index] &&
                                  touched.skus[index].sku_description &&
                                  errors.skus?.[index]?.sku_description
                                }
                                InputProps={{
                                  endAdornment: loadingSkuOptions ? (
                                    <CircularProgress size={24} />
                                  ) : null,
                                }}
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} sm={2}>
                            <FormControl fullWidth>
                              <TextField
                                label="SUT"
                                name={`skus[${index}].sut`}
                                value={sku.sut}
                                onChange={(e) =>
                                  setFieldValue(
                                    `skus[${index}].sut`,
                                    e.target.value
                                  )
                                }
                                error={
                                  touched.skus &&
                                  touched.skus[index] &&
                                  touched.skus[index].sut &&
                                  Boolean(errors.skus?.[index]?.sut)
                                }
                                helperText={
                                  touched.skus &&
                                  touched.skus[index] &&
                                  touched.skus[index].sut &&
                                  errors.skus?.[index]?.sut
                                }
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} sm={2}>
                            <FormControl fullWidth>
                              <TextField
                                label="Stock Qty"
                                name={`skus[${index}].stock_qty`}
                                type="number"
                                value={sku.stock_qty}
                                onChange={(e) =>
                                  setFieldValue(
                                    `skus[${index}].stock_qty`,
                                    e.target.value
                                  )
                                }
                                error={
                                  touched.skus &&
                                  touched.skus[index] &&
                                  touched.skus[index].stock_qty &&
                                  Boolean(errors.skus?.[index]?.stock_qty)
                                }
                                helperText={
                                  touched.skus &&
                                  touched.skus[index] &&
                                  touched.skus[index].stock_qty &&
                                  errors.skus?.[index]?.stock_qty
                                }
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} sm={2}>
                            <IconButton
                              onClick={() => {
                                if (values.skus.length > 1) remove(index);
                              }}
                              disabled={values.skus.length === 1}
                            >
                              <RemoveIcon />
                            </IconButton>
                            {index === values.skus.length - 1 && (
                              <IconButton
                                onClick={() =>
                                  push({
                                    sku_code: "",
                                    sku_description: "",
                                    sut: "",
                                    stock_qty: "",
                                  })
                                }
                              >
                                <AddIcon />
                              </IconButton>
                            )}
                          </Grid>
                        </Grid>
                      ))}
                    </>
                  )}
                </FieldArray>
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
