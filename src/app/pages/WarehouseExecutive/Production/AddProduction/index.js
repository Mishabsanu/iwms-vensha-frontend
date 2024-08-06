import Div from "@jumbo/shared/Div/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AllApis from "app/Apis";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addProduction } from "app/services/apis/addProduction";
import { updateProduction } from "app/services/apis/updateProduction";
import { outerDiv1 } from "app/utils/constants/dropdowns.js";
import dayjs from "dayjs";
import { ErrorMessage, Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddProduction() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [productionLine, setProductionLine] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const { pathname } = useLocation();

  const initialData = state || {};

  const user = {
    production_line_id: initialData?.production_line_id || "Select",
    process_order: initialData?.process_order || "",
    dob: initialData?.dob || "",
    sku_code: initialData?.sku_code || "",
    sku_dese: initialData?.sku_dese || "",
    sut: initialData?.sut || "",
    batch: initialData?.batch || "",
    process_order_qty: initialData?.process_order_qty || "",
    assigned_to: initialData?.assigned_to || "Select",
  };

  const validationSchema = yup.object({
    production_line_id: yup
      .string()
      .required("Production Line is required")
      .test("", "Please select a valid Production Line", (value) => value !== "Select"),
    process_order: yup.string().required("Process Order is required"),
    dob: yup.string().required("Date is required"),
    sku_code: yup.string().required("SKU Code is required"),
    sku_dese: yup.string().required("SKU Description is required"),
    sut: yup.string().required("SUT is required"),
    batch: yup.string().required("Batch is required"),
    process_order_qty: yup.string().required("Process Order Qty is required"),
    assigned_to: yup
      .string()
      .required("Assigned To is required")
      .test("", "Please select a valid Assignee", (value) => value !== "Select"),
  });

  const onUserSave = async (values) => {
    const body = { ...values };
    setSubmitting(true);

    try {
      const response = pathname === "/dashboard/editproduction"
        ? await updateProduction({ ...body, id: state._id })
        : await addProduction(body);

      const successMessage = pathname === "/dashboard/editproduction"
        ? "Production Edited Successfully"
        : "Production Added Successfully";

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: successMessage,
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/production");
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

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const productionLineResponse = await Axios.get(`${AllApis.dropdownList.productionLine}`);
        setProductionLine(productionLineResponse.data.result);

        const assignedToResponse = await Axios.get(`${AllApis.dropdownList.assignedTo}`);
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
        {pathname === "/dashboard/addproduction" ? "Add New Production" : "Edit Production"}
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
                <Grid container rowSpacing={0} columnSpacing={3}>
                  <Grid item xs={4}>
                    <Div sx={outerDiv1}>
                      <Typography variant="h5">Production Line*</Typography>
                      <Select
                        name="production_line_id"
                        value={values.production_line_id}
                        onChange={(event) => setFieldValue("production_line_id", event.target.value)}
                        sx={{ ".css-153xi1v-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select": { padding: 1.2 } }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {productionLine.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.production_line_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage name="production_line_id" component="div" style={{ color: "red" }} />
                    </Div>
                  </Grid>

                  <Grid item xs={4}>
                    <FormTextField1 name="process_order" label="Process Order *" />
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h5">Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "100%", "& .MuiInputBase-input": { padding: 1 } }}
                        format="DD-MM-YYYY"
                        value={values.dob ? dayjs(values.dob) : null}
                        onChange={(newValue) => setFieldValue("dob", newValue ? newValue.startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : null)}
                      />
                    </LocalizationProvider>
                    <Div sx={{ height: "30px" }}>
                      <ErrorMessage name="dob" component="div" style={{ color: "red" }} />
                    </Div>
                  </Grid>

                  <Grid item xs={4}>
                    <FormTextField1 name="sku_code" label="SKU Code *" />
                  </Grid>
                  
                  <Grid item xs={4}>
                    <FormTextField1 name="sku_dese" label="SKU Desc *" />
                  </Grid>

                  <Grid item xs={4}>
                    <FormTextField1 name="sut" label="SUT *" />
                  </Grid>

                  <Grid item xs={4}>
                    <FormTextField1 name="batch" label="Batch *" />
                  </Grid>

                  <Grid item xs={4}>
                    <FormTextField1 name="process_order_qty" label="Process Order Qty *" />
                  </Grid>

                  <Grid item xs={4}>
                    <Div sx={outerDiv1}>
                      <Typography variant="h5">Assigned To*</Typography>
                      <Select
                        name="assigned_to"
                        value={values.assigned_to}
                        onChange={(event) => setFieldValue("assigned_to", event.target.value)}
                        sx={{ ".css-153xi1v-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select": { padding: 1.2 } }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {assignedTo.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {`${item.first_name} ${item.last_name}`}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage name="assigned_to" component="div" style={{ color: "red" }} />
                    </Div>
                  </Grid>
                </Grid>

                <Div sx={{ width: "93.5%", display: "flex", justifyContent: "center", alignItems: "center", gap: 3, mt: 3 }}>
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
      </Div>
    </Div>
  );
}
