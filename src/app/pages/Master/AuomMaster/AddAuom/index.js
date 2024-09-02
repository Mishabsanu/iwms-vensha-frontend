import { useTheme } from "@emotion/react";
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
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AllApis from "app/Apis";
import { addBinType } from "app/services/apis/addBinType";
import { updateBinType } from "app/services/apis/updateBinType";
import { Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

const validationSchema = yup.object({
  sku_code: yup.string("Enter SKU Code").required("SKU Code is required"),
  uom: yup.array().of(
    yup.object({
      base_uom: yup.string("Select Base UOM").required("Base UOM is required"),
      unit: yup.number("Enter Unit").required("Unit is required"),
      auom: yup.string("Enter AUOM").required("AUOM is required"),
    })
  ),
});

export default function AddSkuUom() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);
  const [uomList, setUomList] = useState([]);
  const [uomEntries, setUomEntries] = useState(state?.uom || []);

  const initialValues = {
    sku_code: state?.sku_code || "",
    base_uom: "",
    convention_uom: "",
    unit: "",
    auom: "",
  };

  const handleAddUomEntry = (uomEntry, setFieldValue) => {
    setUomEntries((prevEntries) => [...prevEntries, uomEntry]);
    setFieldValue("base_uom", ""); // Clear the base_uom field
    setFieldValue("convention_uom", ""); // Clear the base_uom field
    setFieldValue("unit", ""); // Clear the unit field
    setFieldValue("auom", ""); // Clear the auom field
  };

  const handleRemoveUomEntry = (index) => {
    setUomEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  };

  const handleTableCellChange = (index, field, value) => {
    const updatedEntries = uomEntries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setUomEntries(updatedEntries);
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

  const onSkuSave = async (values) => {
    const body = { ...values, uom: uomEntries };

    setSubmitting(true);
    try {
      if (pathname === "/master/sku/edit") {
        const data = await updateBinType(body, state._id);
        if (data?.data?.status === true) {
          Swal.fire({
            icon: "success",
            title: "SKU Edited Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate("/dashboard/master/sku");
        } else {
          Swal.fire({
            icon: "error",
            title: data?.data?.message || "Error occurred",
          });
        }
      } else {
        const data = await addBinType(body);
        if (data?.data?.status === true) {
          Swal.fire({
            icon: "success",
            title: "SKU Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate("/dashboard/master/sku");
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
        {pathname === "/master/auom/add" ? "Add New AUOM" : "Edit AUOM"}
      </Typography>

      {uomEntries.length > 0 && (
        <Div sx={{ mt: 2 }}>
          <TableContainer
            component={Paper}
            sx={{ textAlign: "center", width: "100%" }}
          >
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "#7352C7",
                    color: "white",
                    "& .MuiTableCell-root": {
                      py: 2,
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      color: "white",
                      "&:hover": { color: "white" },
                      "&.MuiTableSortLabel-root.Mui-active": {
                        color: "white",
                      },
                    }}
                  >
                    SKU Code
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      "&:hover": { color: "white" },
                      "&.MuiTableSortLabel-root.Mui-active": {
                        color: "white",
                      },
                    }}
                  >
                    Base UOM
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      "&:hover": { color: "white" },
                      "&.MuiTableSortLabel-root.Mui-active": {
                        color: "white",
                      },
                    }}
                  >
                    Convention UOM
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      "&:hover": { color: "white" },
                      "&.MuiTableSortLabel-root.Mui-active": {
                        color: "white",
                      },
                    }}
                  >
                    Unit
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      "&:hover": { color: "white" },
                      "&.MuiTableSortLabel-root.Mui-active": {
                        color: "white",
                      },
                    }}
                  >
                    AUOM
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      "&:hover": { color: "white" },
                      "&.MuiTableSortLabel-root.Mui-active": {
                        color: "white",
                      },
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uomEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: "left" }}>
                      <TextField
                        disabled={true}
                        value={entry.sku_code}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell sx={{width:"19%", textAlign: "left" }}>

                      <FormControl fullWidth variant="outlined">
                        <Select
                          name="base_uom"
                          value={entry.base_uom}
                          onChange={(e) =>
                            handleTableCellChange(
                              index,
                              "base_uom",
                              e.target.value
                            )
                          }
                        >
                          {uomList.map((item) => (
                            <MenuItem key={item._id} value={item.uom}>
                              {item.uom}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{width:"19%", textAlign: "left" }}>
                      <FormControl fullWidth variant="outlined">
                        <Select
                          name="convention_uom"
                          value={entry.convention_uom}
                          onChange={(e) =>
                            handleTableCellChange(
                              index,
                              "convention_uom",
                              e.target.value
                            )
                          }
                        >
                          {uomList.map((item) => (
                            <MenuItem key={item._id} value={item.uom}>
                              {item.uom}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{ textAlign: "left" }}>
                      <TextField
                        value={entry.unit}
                        type="number"
                        onChange={(e) =>
                          handleTableCellChange(index, "unit", e.target.value)
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "left" }}>
                      <TextField
                        value={entry.auom}
                        onChange={(e) =>
                          handleTableCellChange(index, "auom", e.target.value)
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "left" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemoveUomEntry(index)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Div>
      )}

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onSkuSave}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form noValidate autoComplete="off">
            <Div sx={{ mt: 4 }}>
              <Grid container rowSpacing={3} columnSpacing={3}>
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
                    <InputLabel>Base UOM</InputLabel>
                    <Select
                      name="base_uom"
                      value={values.base_uom}
                      onChange={(e) =>
                        setFieldValue("base_uom", e.target.value)
                      }
                      input={<OutlinedInput label="Base UOM" />}
                    >
                      {uomList.map((item) => (
                        <MenuItem key={item._id} value={item.uom}>
                          {item.uom}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.base_uom && !!errors.base_uom && (
                      <FormHelperText>{errors.base_uom}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                    <InputLabel>Convention UOM</InputLabel>
                    <Select
                      name="convention_uom"
                      value={values.convention_uom}
                      onChange={(e) =>
                        setFieldValue("convention_uom", e.target.value)
                      }
                      input={<OutlinedInput label="Convention UOM" />}
                    >
                      {uomList.map((item) => (
                        <MenuItem key={item._id} value={item.uom}>
                          {item.uom}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.convention_uom && !!errors.convention_uom && (
                      <FormHelperText>{errors.convention_uom}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                    <TextField
                      label="Unit*"
                      name="unit"
                      type="number"
                      value={values.unit}
                      onChange={(e) => setFieldValue("unit", e.target.value)}
                      error={touched.unit && Boolean(errors.unit)}
                      helperText={touched.unit && errors.unit}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                    <TextField
                      label="AUOM*"
                      name="auom"
                      value={values.auom}
                      onChange={(e) => setFieldValue("auom", e.target.value)}
                      error={touched.auom && Boolean(errors.auom)}
                      helperText={touched.auom && errors.auom}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Div>

            <Div sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={() => handleAddUomEntry(values, setFieldValue)}
                disabled={
                  !values.sku_code ||
                  !values.base_uom ||
                  !values.convention_uom ||
                  !values.unit ||
                  !values.auom
                }
              >
                Add UOM Entry
              </Button>
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
                onClick={() => navigate("/dashboard/master/auom")}
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
          </Form>
        )}
      </Formik>
    </Div>
  );
}
