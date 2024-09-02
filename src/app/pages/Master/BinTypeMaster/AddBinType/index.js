import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { addBinType } from "app/services/apis/addBinType";
import { updateBinType } from "app/services/apis/updateBinType";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useTheme } from "@emotion/react";
import { Axios } from "index";
import AllApis from "app/Apis";

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

function getStyles(name, selectedValues, theme) {
  return {
    fontWeight:
      selectedValues.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// Validation schema
const validationSchema = yup.object({
  type: yup.string("Enter Bin Type").required("Bin Type is required"),
  allowed_uom: yup
    .array()
    .of(yup.string())
    .min(1, "At least one UOM is required")
    .test(
      "not-select",
      "Please select a valid UOM",
      (value) => value && !value.includes("Select") && value.length > 0
    ),
});

export default function AddBinType() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);
  const [uomList, setUomList] = useState([]);

  // Initializing the state for selected UOMs
  const initialUomList = state?.allowed_uom || [];
  const [selectedUom, setSelectedUom] = useState(
    initialUomList.map((item) => item._id) // Convert UOM objects to their IDs
  );

  const initialValues = {
    type: state?.type || "",
    allowed_uom: selectedUom, // Use IDs for form initialization
    remarks: state?.remarks || "",
  };

  const handleChange = (event, setFieldValue) => {
    const {
      target: { value },
    } = event;

    // Ensure value is always an array
    const newValue = typeof value === "string" ? value.split(",") : value;
    setSelectedUom(newValue);
    setFieldValue("allowed_uom", newValue);
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const uomResponse = await Axios.get(AllApis.dropdownList.uomList);
        setUomList(uomResponse.data.result);
      } catch (error) {
        console.error("Error fetching dropdown data", error);
      }
    };

    fetchDropdownData();
  }, []);

  const onBinTypeSave = async (values) => {
    const body = { ...values };

    setSubmitting(true);
    try {
      if (pathname === "/master/bin-type/edit") {
        // Convert IDs to objects for editing
        body.allowed_uom = body.allowed_uom.map((id) => ({
          _id: id,
        }));

        const data = await updateBinType(body, state._id);
        if (data?.data?.status === true) {
          Swal.fire({
            icon: "success",
            title: "Bin Type Edited Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate("/dashboard/master/bin-type");
        } else {
          Swal.fire({
            icon: "error",
            title: data?.data?.message || "Error occurred",
          });
        }
      } else {
        // Convert IDs to objects for addition
        body.allowed_uom = body.allowed_uom.map((id) => ({
          _id: id,
        }));

        const data = await addBinType(body);
        if (data?.data?.status === true) {
          Swal.fire({
            icon: "success",
            title: "Bin Type Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate("/dashboard/master/bin-type");
        } else {
          Swal.fire({
            icon: "error",
            title: data?.data?.message || "Error occurred",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error occurred",
      });
    }
    setSubmitting(false);
  };

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">
        {pathname === "/master/bin-type/add" ? "Add New Bin Type" : "Edit Bin Type"}
      </Typography>
      <Div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onBinTypeSave}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        error={touched.type && Boolean(errors.type)}
                        helperText={touched.type && errors.type}
                        label="Bin Type*"
                        name="type"
                        value={values.type}
                        onChange={(e) => setFieldValue("type", e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl
                      fullWidth
                      error={touched.allowed_uom && !!errors.allowed_uom}
                    >
                      <InputLabel id="demo-multiple-name-label">UOM</InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={values.allowed_uom}
                        onChange={(event) => handleChange(event, setFieldValue)}
                        input={<OutlinedInput label="UOM" />}
                        MenuProps={MenuProps}
                        renderValue={(selected) =>
                          selected
                            .map(
                              (id) => uomList.find((uom) => uom._id === id)?.uom
                            )
                            .join(", ")
                        }
                      >
                        {uomList.map((item) => (
                          <MenuItem
                            key={item._id}
                            value={item._id}
                            style={getStyles(
                              item._id,
                              values.allowed_uom,
                              theme
                            )}
                          >
                            {item.uom}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.allowed_uom && !!errors.allowed_uom && (
                        <FormHelperText>{errors.allowed_uom}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Remarks"
                        name="remarks"
                        value={values.remarks}
                        onChange={(e) => setFieldValue("remarks", e.target.value)}
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
                          navigate("/dashboard/master/bin-type");
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
