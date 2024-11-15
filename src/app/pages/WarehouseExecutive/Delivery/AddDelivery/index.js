import Div from "@jumbo/shared/Div/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addDelivery } from "app/services/apis/addDelivery";
import { updateDelivery } from "app/services/apis/updateDelivery";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddDelivery() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const data = state; // Assuming no initial data for this case

  const user = {
    delivery_date: data?.delivery_date || "",
    delivery_no: data?.delivery_no || "",
    sku_code: data?.sku_code || "",
    sku_desc: data?.sku_desc || "",
    uom: data?.uom || "",
    delivery_qty: data?.delivery_qty || "",
    batch_no: data?.batch_no || "",
    picked_qty: data?.picked_qty || "",
    transfer_order_no: data?.transfer_order_no || "",
    bin_no: data?.bin_no || "",
    bin_qty: data?.bin_qty || "",
    pick_list_no: data?.pick_list_no || "",
    picked_by: data?.picked_by || "",
    loading_sheet_no: data?.loading_sheet_no || "",
    loaded_by: data?.loaded_by || "",
  };

  const validationSchema = yup.object({
    delivery_date: yup.string().required("Delivery Date is required"),
    delivery_no: yup.string().required("Delivery No is required"),
    sku_code: yup.string().required("SKU Code is required"),
    sku_desc: yup.string().required("SKU Description is required"),
    uom: yup.string().required("UOM is required"),
    delivery_qty: yup.number().required("Delivery Qty is required"),
    batch_no: yup.string().required("Batch No is required"),
    picked_qty: yup.number().required("Picked Qty is required"),
    transfer_order_no: yup.string().required("Transfer Order No is required"),
    bin_no: yup.string().required("BIN No is required"),
    bin_qty: yup.number().required("BIN Qty is required"),
    pick_list_no: yup.string().required("Pick List No is required"),
    picked_by: yup.string().required("Picked By is required"),
    loading_sheet_no: yup.string().required("Loading Sheet No is required"),
    loaded_by: yup.string().required("Loaded By is required"),
  });

  const onUserSave = async (values) => {
    setSubmitting(true);
    try {
      const response =
        pathname === "/warehouseexecutive/delivery/edit"
          ? await updateDelivery({ ...values, id: data._id })
          : await addDelivery(values);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title:
            pathname === "/warehouseexecutive/delivery/edit"
              ? "Delivery Edited Successfully"
              : "Delivery Added Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/warehouseexecutive/delivery");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
    setSubmitting(false);
  };

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname === "/warehouseexecutive/delivery/add"
          ? "Add New Delivery"
          : "Edit Delivery"}
      </Typography>
      <Div>
        <Formik
          initialValues={user}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onUserSave}
        >
          {({ setFieldValue, values, errors }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={2} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Delivery Date"
                        name="delivery_date"
                        value={
                          values.delivery_date
                            ? dayjs(values.delivery_date)
                            : null
                        }
                        onChange={(delivery_date) =>
                          setFieldValue(
                            "delivery_date",
                            delivery_date ? delivery_date.toISOString() : ""
                          )
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
                        sx={{ width: "100%" }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  {/* Delivery No */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Delivery No *"
                        name="delivery_no"
                        value={values.delivery_no}
                        onChange={(e) =>
                          setFieldValue("delivery_no", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.delivery_no)}
                        helperText={errors.delivery_no}
                      />
                    </FormControl>
                  </Grid>

                  {/* SKU Code */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="SKU Code *"
                        name="sku_code"
                        value={values.sku_code}
                        onChange={(e) =>
                          setFieldValue("sku_code", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.sku_code)}
                        helperText={errors.sku_code}
                      />
                    </FormControl>
                  </Grid>

                  {/* SKU Desc */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="SKU Desc *"
                        name="sku_desc"
                        value={values.sku_desc}
                        onChange={(e) =>
                          setFieldValue("sku_desc", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.sku_desc)}
                        helperText={errors.sku_desc}
                      />
                    </FormControl>
                  </Grid>

                  {/* UOM */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="UOM *"
                        name="uom"
                        value={values.uom}
                        onChange={(e) => setFieldValue("uom", e.target.value)}
                        fullWidth
                        error={Boolean(errors.uom)}
                        helperText={errors.uom}
                      />
                    </FormControl>
                  </Grid>

                  {/* Delivery Qty */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Delivery Qty *"
                        name="delivery_qty"
                        value={values.delivery_qty}
                        onChange={(e) =>
                          setFieldValue("delivery_qty", e.target.value)
                        }
                        fullWidth
                        type="number"
                        error={Boolean(errors.delivery_qty)}
                        helperText={errors.delivery_qty}
                      />
                    </FormControl>
                  </Grid>

                  {/* Batch No */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Batch No *"
                        name="batch_no"
                        value={values.batch_no}
                        onChange={(e) =>
                          setFieldValue("batch_no", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.batch_no)}
                        helperText={errors.batch_no}
                      />
                    </FormControl>
                  </Grid>

                  {/* Picked Qty */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Picked Qty *"
                        name="picked_qty"
                        value={values.picked_qty}
                        onChange={(e) =>
                          setFieldValue("picked_qty", e.target.value)
                        }
                        fullWidth
                        type="number"
                        error={Boolean(errors.picked_qty)}
                        helperText={errors.picked_qty}
                      />
                    </FormControl>
                  </Grid>

                  {/* Transfer Order No */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Transfer Order No *"
                        name="transfer_order_no"
                        value={values.transfer_order_no}
                        onChange={(e) =>
                          setFieldValue("transfer_order_no", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.transfer_order_no)}
                        helperText={errors.transfer_order_no}
                      />
                    </FormControl>
                  </Grid>

                  {/* BIN No */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="BIN No *"
                        name="bin_no"
                        value={values.bin_no}
                        onChange={(e) =>
                          setFieldValue("bin_no", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.bin_no)}
                        helperText={errors.bin_no}
                      />
                    </FormControl>
                  </Grid>

                  {/* BIN Qty */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="BIN Qty *"
                        name="bin_qty"
                        value={values.bin_qty}
                        onChange={(e) =>
                          setFieldValue("bin_qty", e.target.value)
                        }
                        fullWidth
                        type="number"
                        error={Boolean(errors.bin_qty)}
                        helperText={errors.bin_qty}
                      />
                    </FormControl>
                  </Grid>

                  {/* Pick List No */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Pick List No *"
                        name="pick_list_no"
                        value={values.pick_list_no}
                        onChange={(e) =>
                          setFieldValue("pick_list_no", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.pick_list_no)}
                        helperText={errors.pick_list_no}
                      />
                    </FormControl>
                  </Grid>

                  {/* Picked By */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Picked By *"
                        name="picked_by"
                        value={values.picked_by}
                        onChange={(e) =>
                          setFieldValue("picked_by", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.picked_by)}
                        helperText={errors.picked_by}
                      />
                    </FormControl>
                  </Grid>

                  {/* Loading Sheet No */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Loading Sheet No *"
                        name="loading_sheet_no"
                        value={values.loading_sheet_no}
                        onChange={(e) =>
                          setFieldValue("loading_sheet_no", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.loading_sheet_no)}
                        helperText={errors.loading_sheet_no}
                      />
                    </FormControl>
                  </Grid>

                  {/* Loaded By */}
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Loaded By *"
                        name="loaded_by"
                        value={values.loaded_by}
                        onChange={(e) =>
                          setFieldValue("loaded_by", e.target.value)
                        }
                        fullWidth
                        error={Boolean(errors.loaded_by)}
                        helperText={errors.loaded_by}
                      />
                    </FormControl>
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
                    onClick={() => navigate("/warehouseexecutive/delivery")}
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
