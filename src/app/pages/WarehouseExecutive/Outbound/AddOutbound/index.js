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
  const [skuIndexForModal, setSkuIndexForModal] = useState(null);
  const [customer, setCustomer] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const data = state;

  const user = {
    date: data?.date || null,
    order_type: data?.order_type || "SO",
    sales_order_no: data?.sales_order_no || "",
    sales_transfer_order_no: data?.sales_transfer_order_no || "",
    returnable_no: data?.returnable_no || "",
    consignment_no: data?.consignment_no || "",
    customer_name: data?.customer_name || "",
    customer_code: data?.customer_code || "",
    customer_address: data?.customer_address || "",
    bill_to_code: data?.bill_to_code || "",
    bill_to_address: data?.bill_to_address || "",
    ship_to_code: data?.ship_to_code || "",
    ship_to_address: data?.ship_to_address || "",
    plant_address: data?.plant_address || "",
    plant_name: data?.plant_name || "",
    route_no: data?.route_no || "",
    others: data?.others || "",
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
  const handleCustomerChange = async (event, setFieldValue) => {
    const selectedCustomer = event.target.value;

    if (selectedCustomer) {
      try {
        const response = await Axios.get(
          `${AllApis.dropdownList.getCustomerByName(selectedCustomer)}`
        );
        const customerData = response.data.result;
        setCustomerData(customerData);
        setFieldValue("customer_name", selectedCustomer);
        setFieldValue("customer_code", customerData.customer_code || "");
        setFieldValue("customer_address", customerData.address || "");
        setFieldValue("bill_to_code", customerData.bill_to_code || "");
        setFieldValue("bill_to_address", customerData.bill_to_address || "");
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    } else {
      setCustomerData({});
      setFieldValue("customer_name", "");
      setFieldValue("customer_code", "");
      setFieldValue("customer_address", "");
      setFieldValue("bill_to_code", "");
      setFieldValue("bill_to_address", "");
    }
  };
  const handleShipToChange = (event, setFieldValue) => {
    const selectedShipToCode = event.target.value;
    const selectedShipTo = customerData.ship_to.find(
      (ship) => ship.ship_to_code === selectedShipToCode
    );

    if (selectedShipTo) {
      setFieldValue("ship_to_code", selectedShipToCode);
      setFieldValue("ship_to_address", selectedShipTo.ship_to_address || "");
    } else {
      setFieldValue("ship_to_code", "");
      setFieldValue("ship_to_address", "");
    }
  };
  const validationSchema = yup.object({
    date: yup.string().required("Date is required"),
    order_type: yup.string().required("Order Type is required"),
    // entity_name: yup
    //   .string()
    //   .required(
    //     data?.order_type === "STO"
    //       ? "Plant Name is required"
    //       : "Customer Name is required"
    //   )
    //   .test(
    //     "entity-name-not-select",
    //     `Please select a valid ${
    //       data?.order_type === "STO" ? "Plant Name" : "Customer Name"
    //     }`,
    //     (value) => value !== "Select"
    //   ),
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
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
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
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
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
                  {/* <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={
                          touched?.returnable_no &&
                          Boolean(errors?.returnable_no)
                        }
                        helperText={
                          touched?.returnable_no && errors?.returnable_no
                        }
                        label="Returnable No*"
                        name="returnable_no"
                        value={values.returnable_no}
                        onChange={(e) =>
                          setFieldValue("returnable_no", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={
                          touched?.consignment_no &&
                          Boolean(errors?.consignment_no)
                        }
                        helperText={
                          touched?.consignment_no && errors?.consignment_no
                        }
                        label="Consignment No*"
                        name="consignment_no"
                        value={values.consignment_no}
                        onChange={(e) =>
                          setFieldValue("consignment_no", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched?.others && Boolean(errors?.others)}
                        helperText={touched?.others && errors?.others}
                        label="Other*"
                        name="others"
                        value={values.others}
                        onChange={(e) =>
                          setFieldValue("others", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid> */}
                  {values.order_type === "SO" ? (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={
                            touched?.sales_order_no &&
                            Boolean(errors?.sales_order_no)
                          }
                          helperText={
                            touched?.sales_order_no && errors?.sales_order_no
                          }
                          label="Sales Order No*"
                          name="sales_order_no"
                          value={values.sales_order_no}
                          onChange={(e) =>
                            setFieldValue("sales_order_no", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          error={
                            touched?.sales_transfer_order_no &&
                            Boolean(errors?.sales_transfer_order_no)
                          }
                          helperText={
                            touched?.sales_transfer_order_no &&
                            errors?.sales_transfer_order_no
                          }
                          label="Sales Transfer Order No *"
                          name="sales_transfer_order_no"
                          value={values.sales_transfer_order_no}
                          onChange={(e) =>
                            setFieldValue(
                              "sales_transfer_order_no",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                    </Grid>
                  )}
                  {values.order_type === "STO" && (
                    // <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    //   <FormControl fullWidth>
                    //     <TextField
                    //       label="Plant Name *"
                    //       name="plant_name"
                    //       value={values.plant_name}
                    //       onChange={(e) =>
                    //         setFieldValue("plant_name", e.target.value)
                    //       }
                    //       select
                    //       fullWidth
                    //       error={
                    //         touched.plant_name && Boolean(errors.plant_name)
                    //       }
                    //       helperText={touched.plant_name && errors.plant_name}
                    //       InputLabelProps={{
                    //         shrink: values.plant_name ? true : false,
                    //       }}
                    //       SelectProps={{
                    //         native: false,
                    //       }}
                    //     >
                    //       <MenuItem value="">Select</MenuItem>
                    //       {customer.map((item) => (
                    //         <MenuItem key={item._id} value={item._id}>
                    //           {item?.customer_name}
                    //         </MenuItem>
                    //       ))}
                    //     </TextField>
                    //   </FormControl>
                    // </Grid>
                    <>
                      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                          <TextField
                            error={
                              touched?.plant_name && Boolean(errors?.plant_name)
                            }
                            helperText={
                              touched?.plant_name && errors?.plant_name
                            }
                            label="Plant Name *"
                            name="plant_name"
                            value={values.plant_name}
                            onChange={(e) =>
                              setFieldValue("plant_name", e.target.value)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                          <TextField
                            error={
                              touched?.plant_address &&
                              Boolean(errors?.plant_address)
                            }
                            helperText={
                              touched?.plant_address && errors?.plant_address
                            }
                            label="Plant Address *"
                            name="plant_address"
                            value={values.plant_address}
                            onChange={(e) =>
                              setFieldValue("plant_address", e.target.value)
                            }
                          />
                        </FormControl>
                      </Grid>
                    </>
                  )}
                  {values.order_type === "SO" && (
                    <>
                      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                          <TextField
                            label="Customer Name *"
                            name="customer_name"
                            value={values.customer_name}
                            onChange={(e) =>
                              handleCustomerChange(e, setFieldValue)
                            }
                            select
                            fullWidth
                            error={
                              touched.customer_name &&
                              Boolean(errors.customer_name)
                            }
                            helperText={
                              touched.customer_name && errors.customer_name
                            }
                            InputLabelProps={{
                              shrink: values.customer_name ? true : false,
                            }}
                            SelectProps={{ native: false }}
                          >
                            <MenuItem value="">Select</MenuItem>
                            {customer.map((item) => (
                              <MenuItem
                                key={item._id}
                                value={item.customer_name}
                              >
                                {item.customer_name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                          <TextField
                            error={
                              touched?.customer_code &&
                              Boolean(errors?.customer_code)
                            }
                            helperText={
                              touched?.customer_code && errors?.customer_code
                            }
                            label="Customer Code*"
                            name="customer_code"
                            value={values.customer_code}
                            onChange={(e) =>
                              setFieldValue("customer_code", e.target.value)
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                          <TextField
                            error={
                              touched?.customer_address &&
                              Boolean(errors?.customer_address)
                            }
                            helperText={
                              touched?.customer_address &&
                              errors?.customer_address
                            }
                            label="Customer Address*"
                            name="customer_address"
                            value={values.customer_address}
                            onChange={(e) =>
                              setFieldValue("customer_address", e.target.value)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                          <TextField
                            error={
                              touched?.bill_to_code &&
                              Boolean(errors?.bill_to_code)
                            }
                            helperText={
                              touched?.bill_to_code && errors?.bill_to_code
                            }
                            label="Bill To Code*"
                            name="bill_to_code"
                            value={values.bill_to_code}
                            onChange={(e) =>
                              setFieldValue("bill_to_code", e.target.value)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                          <TextField
                            error={
                              touched?.bill_to_address &&
                              Boolean(errors?.bill_to_address)
                            }
                            helperText={
                              touched?.bill_to_address &&
                              errors?.bill_to_address
                            }
                            label="Bill To Address*"
                            name="bill_to_address"
                            value={values.bill_to_address}
                            onChange={(e) =>
                              setFieldValue("bill_to_address", e.target.value)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                          <TextField
                            label="Ship To Code *"
                            name="ship_to_code"
                            value={values.ship_to_code}
                            onChange={(e) =>
                              handleShipToChange(e, setFieldValue)
                            }
                            select
                            fullWidth
                            error={
                              touched.ship_to_code &&
                              Boolean(errors.ship_to_code)
                            }
                            helperText={
                              touched.ship_to_code && errors.ship_to_code
                            }
                            InputLabelProps={{
                              shrink: values.ship_to_code ? true : false,
                            }}
                            SelectProps={{ native: false }}
                          >
                            <MenuItem value="">Select</MenuItem>
                            {customerData?.ship_to?.map((item) => (
                              <MenuItem
                                key={item?._id}
                                value={item?.ship_to_code}
                              >
                                {item?.ship_to_code}
                              </MenuItem>
                            ))}
                          </TextField>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                          <TextField
                            error={
                              touched?.ship_to_address &&
                              Boolean(errors?.ship_to_address)
                            }
                            helperText={
                              touched?.ship_to_address &&
                              errors?.ship_to_address
                            }
                            label="Ship To Address*"
                            name="ship_to_address"
                            value={values.ship_to_address}
                            onChange={(e) =>
                              setFieldValue("ship_to_address", e.target.value)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <FormControl fullWidth>
                          <TextField
                            error={
                              touched?.route_no && Boolean(errors?.route_no)
                            }
                            helperText={touched?.route_no && errors?.route_no}
                            label="Route No*"
                            name="route_no"
                            value={values.route_no}
                            onChange={(e) =>
                              setFieldValue("route_no", e.target.value)
                            }
                          />
                        </FormControl>
                      </Grid>
                    </>
                  )}
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
