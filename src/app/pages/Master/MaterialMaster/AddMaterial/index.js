import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import AllApis from "app/Apis";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addMaterial } from "app/services/apis/addMaterial";
import { updateMaterial } from "app/services/apis/updateMaterial";
import { ErrorMessage, Form, Formik } from "formik";
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
  const supplier = {
    warehouse_code: state?.warehouse_code || "",
    item_type: state?.item_type || "",
    storage_type: state?.storage_type || "Select",
    customer_code: state?.customer_code || "",
    unit: state?.unit || "",
    vendor_code: state?.vendor_code || "",
    sku_code: state?.sku_code || "",
    sut_qty: state?.sut_qty || "",
    material_detail: state?.material_detail || "",
    item_life: state?.item_life || "",
    sut: state?.sut || "",
    pallet_qty: state?.pallet_qty || "",
    sku_group: state?.sku_group || "",
    sku_description: state?.sku_description || "",
    sii: state?.sii || "",
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
    sku_grp: state?.sku_grp || "",
    ssi: state?.ssi || "",
  };
  const [vendorData, setVendorData] = useState([]);
  const [storageType, setStorageType] = useState([]);

  useEffect(async () => {
    const vendors = await Axios.get(`${AllApis.dropdownList.vendor}`);
    setVendorData(vendors?.data?.result);
    const response = await Axios.get(AllApis.dropdownList.storage_type);
    setStorageType(response?.data?.result);
  }, []);
  const validationSchema = yup.object({
    warehouse_code: yup.string().required("Warehouse code is required"),
    item_type: yup.string("Enter Item Type").required("Item Type is required"),
    storage_type: yup.string().required("Storage Type is required"),
    sku_description: yup.string().required("SKU Desc is required"),
    customer_code: yup.string().required("Customer Code is required"),
    vendor_code: yup
      .string("Enter Vendor Code")
      .required("Vendor Code is required"),
    sku_code: yup.string("Enter SKU Code").required("SKU Code is required"),
    material_detail: yup
      .string("Enter Material Details")
      .required("Material Details is required"),
    item_life: yup.string("Enter Item Life").required("Item Life is required"),
    sut: yup.string("Enter SUT").required("SUT is required"),
    pallet_qty: yup
      .string("Enter Pallet Qty")
      .required("Pallet Qty is required"),
    sku_group: yup.string("Enter Sku Group").required("Pallet Qty is required"),
    sii: yup.string("Enter Sii").required("Sii is required"),
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
    sut_qty: yup.string("Enter Sut Qty").required("Sut Qty is required"),
    unit: yup.string("Enter Unit").required("Unit is required"),
    actual_weight: yup
      .string("Enter Actual Weight")
      .required("Actual Weight is required"),
    excel_filename: yup
      .string("Enter Excel File Name")
      .required("Excel File Name is required"),
    sku_grp: yup.string("Enter SKU Group").required("SKU Group is required"),
    ssi: yup.string("Enter SSI").required("SSI is required"),
  });
  const onUserSave = async (values) => {
    const body = { ...values };
    for (let key in body) {
      if (
        key !== "warehouse_code" &&
        key !== "item_type" &&
        key !== "storage_type" &&
        key !== "customer_code" &&
        key !== "sku_code" &&
        key !== "material_detail" &&
        key !== "sut" &&
        key !== "pallet_qty" &&
        key !== "sku_group" &&
        key != "sii" &&
        key != "sub_category"
      ) {
        if (typeof body[key] === "string") {
          body[key] = body[key].toUpperCase();
        }
      }
    }

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
          initialValues={supplier}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onUserSave}
          // onSubmit={(values) => console.log(values)}
        >
          {({ values, setFieldValue, errors }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={3}>
                    <FormTextField1
                      name="warehouse_code"
                      label="Warehouse Code *"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="item_type" label="Item Type *" />
                  </Grid>
                  <Grid item xs={3}>
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
                  <Grid item xs={3}>
                    <Div
                      sx={{
                        marginBottom: 2,
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h5">Vendor Code*</Typography>
                      <Select
                        name="vendor_code"
                        value={values?.vendor_code}
                        onChange={(event) =>
                          setFieldValue("vendor_code", event.target.value)
                        }
                        sx={{
                          ".css-153xi1v-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                            { padding: 1.2 },
                        }}
                      >
                        <MenuItem value="Select">Select</MenuItem>
                        {vendorData.map((item) => (
                          <MenuItem key={item._id} value={item.vendor_code}>
                            {item.vendor_code}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage
                        name="vendor_code"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Div>
                  </Grid>

                  <Grid item xs={3}>
                    <FormTextField1
                      name="customer_code"
                      label="Customer Code*"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="sku_code" label="SKU Code *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="sku_description" label="SKU Desc *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1
                      name="material_detail"
                      label="Material Detail *"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="item_life" label="Item Life *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="unit" label="Unit *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="sut_qty" label="Sut Qty *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="sut" label="SUT *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="pallet_qty" label="Pallet Qty *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="sku_group" label="SKU Group *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="sii" label="Sii *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1
                      name="sub_category"
                      label="Sub Category *"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="combination" label="Combination *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1
                      name="bulk_structure"
                      label="Bulk Structure *"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="length" label="Length *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="breadth" label="Breadth *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="height" label="Height *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1 name="total_craft" label="Total Craft *" />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1
                      name="gross_weight"
                      label="Gross Weight *"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1
                      name="actual_weight"
                      label="Actual Weight *"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormTextField1
                      name="excel_filename"
                      label="Excel File Name *"
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
                          navigate("/dashboard/master/supplier");
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
