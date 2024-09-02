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
import { addMaterial } from "app/services/apis/addMaterial";
import { updateMaterial } from "app/services/apis/updateMaterial";
import { Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddMaterial() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  console.log(state, "state");

  const material = {
    warehouse_code: state?.warehouse_code || "",
    item_type: state?.item_type || "",
    storage_type: state?.storage_type || "",
    customer_code: state?.customer_code || "",
    unit: state?.unit || "",
    vendor_code: state?.vendor_code || "",
    sku_code: state?.sku_code || "",
    sut_qty: state?.sut_qty || "",
    item_life: state?.item_life || "",
    sut: state?.sut || "",
    pallet_qty: state?.pallet_qty || "",
    sku_description: state?.sku_description || "",
    ssi: state?.ssi || "",
    sub_category: state?.sub_category || "",
    combination: state?.combination || "",
    bulk_structure: state?.bulk_structure || "",
    length: state?.length || "",
    breadth: state?.breadth || "",
    height: state?.height || "",
    total_craft: state?.total_craft || "",
    gross_weight: state?.gross_weight || "",
    actual_weight: state?.actual_weight || "",
    excel_filename: state?.excel_filename || "",
    sku_group: state?.sku_group || "",
  };
  const [vendorData, setVendorData] = useState([]);
  const [storageType, setStorageType] = useState([]);
  const [customerCode, setCustomerCode] = useState([]);
  useEffect(async () => {
    const vendors = await Axios.get(`${AllApis.dropdownList.vendor}`);
    setVendorData(vendors?.data?.result);
    const response = await Axios.get(AllApis.dropdownList.storage_type);
    setStorageType(response?.data?.result);
    const customerResponse = await Axios.get(AllApis.dropdownList.customer);
    setCustomerCode(customerResponse?.data?.result);
  }, []);

  const validationSchema = yup.object({
    warehouse_code: yup.string().required("Warehouse code is required"),
    item_type: yup.string("Enter Item Type").required("Item Type is required"),
    mrp: yup.string("Enter MRP").required("MRP is required"),
    storage_type: yup.string().required("Storage Type is required"),
    sku_description: yup.string().required("SKU Description is required"),
    customer_code: yup.string().required("Customer Code is required"),
    vendor_code: yup
      .string("Enter Vendor Code")
      .required("Vendor Code is required"),
    sku_code: yup.string("Enter SKU Code").required("SKU Code is required"),
    item_life: yup.string("Enter Item Life").required("Item Life is required"),
    sut: yup.string("Enter SUT").required("SUT is required"),
    pallet_qty: yup
      .string("Enter Pallet Qty") // corrected from 'pallet_qty'
      .required("Pallet Qty is required"),
    sku_group: yup.string("Enter SKU Group").required("SKU Group is required"),
    ssi: yup.string("Enter SSI").required("SSI is required"),
    sub_category: yup
      .string("Enter Sub Category")
      .required("Sub Category is required"),
    combination: yup
      .string("Enter Combination")
      .required("Combination is required"),
    bulk_structure: yup
      .string("Enter Bulk Structure")
      .required("Bulk Structure is required"),
    length: yup.string("Enter Length").required("Length is required"),
    breadth: yup.string("Enter Breadth").required("Breadth is required"),
    height: yup.string("Enter Height").required("Height is required"),
    total_craft: yup
      .string("Enter Total Craft")
      .required("Total Craft is required"),
    gross_weight: yup
      .string("Enter Gross Weight")
      .required("Gross Weight is required"),
    sut_qty: yup.string("Enter SUT Qty").required("SUT Qty is required"),
    unit: yup.string("Enter Unit").required("Unit is required"),
    actual_weight: yup
      .string("Enter Actual Weight")
      .required("Actual Weight is required"),
  });

  const onMaterialSave = async (values) => {
    const body = { ...values };
    setSubmitting(true);
    if (pathname == "/master/material/edit") {
      const data = await updateMaterial(body, state._id);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Material Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/material");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addMaterial(body);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Material Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/material");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.data?.message,
          text: "",
        });
      }
    }
    setSubmitting(false);
  };

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname == "/master/material/add"
          ? "Add New Material"
          : "Edit Material"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={material}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onMaterialSave}
        >
          {({ values, setFieldValue, errors, touched, isSubmitting }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={
                          touched.warehouse_code &&
                          Boolean(errors.warehouse_code)
                        }
                        helperText={
                          touched.warehouse_code && errors.warehouse_code
                        }
                        label="Warehouse Code*"
                        name="warehouse_code"
                        value={values.warehouse_code}
                        onChange={(e) =>
                          setFieldValue("warehouse_code", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.item_type && Boolean(errors.item_type)}
                        helperText={touched.item_type && errors.item_type}
                        label="Item Type*"
                        name="item_type"
                        value={values.item_type}
                        onChange={(e) =>
                          setFieldValue("item_type", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Storage Type"
                        name="storage_type"
                        value={values.storage_type}
                        onChange={(e) =>
                          setFieldValue("storage_type", e.target.value)
                        }
                        select
                        fullWidth
                        error={errors.storage_type}
                        helperText={errors.storage_type}
                        InputLabelProps={{
                          shrink: values.storage_type,
                        }}
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {storageType.map((item) => (
                          <MenuItem key={item._id} value={item.storage_type}>
                            {item.storage_type}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Customer Code"
                        name="customer_code"
                        value={values.customer_code}
                        onChange={(e) =>
                          setFieldValue("customer_code", e.target.value)
                        }
                        select
                        fullWidth
                        error={errors.customer_code}
                        helperText={errors.customer_code}
                        InputLabelProps={{
                          shrink: values.customer_code,
                        }}
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {customerCode.map((item) => (
                          <MenuItem key={item._id} value={item.customer_code}>
                            {item.customer_code}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Vendor Code"
                        name="vendor_code"
                        value={values.vendor_code}
                        onChange={(e) =>
                          setFieldValue("vendor_code", e.target.value)
                        }
                        select
                        fullWidth
                        error={errors.vendor_code}
                        helperText={errors.vendor_code}
                        InputLabelProps={{
                          shrink: values.vendor_code,
                        }}
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {vendorData.map((item) => (
                          <MenuItem key={item._id} value={item.vendor_code}>
                            {item.vendor_code}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.unit && Boolean(errors.unit)}
                        helperText={touched.unit && errors.unit}
                        label="Unit*"
                        name="unit"
                        value={values.unit}
                        onChange={(e) => setFieldValue("unit", e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.sut_qty && Boolean(errors.sut_qty)}
                        helperText={touched.sut_qty && errors.sut_qty}
                        label="SUT Qty*"
                        name="sut_qty"
                        value={values.sut_qty}
                        onChange={(e) =>
                          setFieldValue("sut_qty", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.sut && Boolean(errors.sut)}
                        helperText={touched.sut && errors.sut}
                        label="SUT*"
                        name="sut"
                        value={values.sut}
                        onChange={(e) => setFieldValue("sut", e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.item_life && Boolean(errors.item_life)}
                        helperText={touched.item_life && errors.item_life}
                        label="Item Life*"
                        name="item_life"
                        value={values.item_life}
                        onChange={(e) =>
                          setFieldValue("item_life", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.mrp && Boolean(errors.mrp)}
                        helperText={touched.mrp && errors.mrp}
                        label="MRP*"
                        name="mtp"
                        value={values.mrp}
                        onChange={(e) =>
                          setFieldValue("mrp", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.pallet_qty && Boolean(errors.pallet_qty)}
                        helperText={touched.pallet_qty && errors.pallet_qty}
                        label="Pallet Qty*"
                        name="pallet_qty"
                        value={values.pallet_qty}
                        onChange={(e) =>
                          setFieldValue("pallet_qty", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.sku_code && Boolean(errors.sku_code)}
                        helperText={touched.sku_code && errors.sku_code}
                        label="SKU Code*"
                        name="sku_code"
                        value={values.sku_code}
                        onChange={(e) =>
                          setFieldValue("sku_code", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={
                          touched.sku_description &&
                          Boolean(errors.sku_description)
                        }
                        helperText={
                          touched.sku_description && errors.sku_description
                        }
                        label="SKU Description*"
                        name="sku_description"
                        value={values.sku_description}
                        onChange={(e) =>
                          setFieldValue("sku_description", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.sku_group && Boolean(errors.sku_group)}
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
                        error={touched.ssi && Boolean(errors.ssi)}
                        helperText={touched.ssi && errors.ssi}
                        label="SSI*"
                        name="ssi"
                        value={values.ssi}
                        onChange={(e) => setFieldValue("ssi", e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={
                          touched.sub_category && Boolean(errors.sub_category)
                        }
                        helperText={touched.sub_category && errors.sub_category}
                        label="Sub Category*"
                        name="sub_category"
                        value={values.sub_category}
                        onChange={(e) =>
                          setFieldValue("sub_category", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={
                          touched.combination && Boolean(errors.combination)
                        }
                        helperText={touched.combination && errors.combination}
                        label="Combination*"
                        name="combination"
                        value={values.combination}
                        onChange={(e) =>
                          setFieldValue("combination", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={
                          touched.bulk_structure &&
                          Boolean(errors.bulk_structure)
                        }
                        helperText={
                          touched.bulk_structure && errors.bulk_structure
                        }
                        label="Bulk Structure*"
                        name="bulk_structure"
                        value={values.bulk_structure}
                        onChange={(e) =>
                          setFieldValue("bulk_structure", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.length && Boolean(errors.length)}
                        helperText={touched.length && errors.length}
                        label="Length*"
                        name="length"
                        value={values.length}
                        onChange={(e) =>
                          setFieldValue("length", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.breadth && Boolean(errors.breadth)}
                        helperText={touched.breadth && errors.breadth}
                        label="Breadth*"
                        name="breadth"
                        value={values.breadth}
                        onChange={(e) =>
                          setFieldValue("breadth", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.height && Boolean(errors.height)}
                        helperText={touched.height && errors.height}
                        label="Height*"
                        name="height"
                        value={values.height}
                        onChange={(e) =>
                          setFieldValue("height", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={
                          touched.total_craft && Boolean(errors.total_craft)
                        }
                        helperText={touched.total_craft && errors.total_craft}
                        label="Total Craft*"
                        name="total_craft"
                        value={values.total_craft}
                        onChange={(e) =>
                          setFieldValue("total_craft", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={
                          touched.gross_weight && Boolean(errors.gross_weight)
                        }
                        helperText={touched.gross_weight && errors.gross_weight}
                        label="Gross Weight*"
                        name="gross_weight"
                        value={values.gross_weight}
                        onChange={(e) =>
                          setFieldValue("gross_weight", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={
                          touched.actual_weight && Boolean(errors.actual_weight)
                        }
                        helperText={
                          touched.actual_weight && errors.actual_weight
                        }
                        label="Actual Weight*"
                        name="actual_weight"
                        value={values.actual_weight}
                        onChange={(e) =>
                          setFieldValue("actual_weight", e.target.value)
                        }
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
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure you want to cancel?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          navigate("/dashboard/master/pallet");
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
