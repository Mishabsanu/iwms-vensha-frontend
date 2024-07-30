import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addPallet } from "app/services/apis/addPallet";
import { addProductionLine } from "app/services/apis/addProductionLine";
import { updatePallet } from "app/services/apis/updatePallet";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddProductionLine() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const pallets = {
    production_line_name: state?.production_line_name ? state?.production_line_name : "",
    production_line_description: state?.production_line_description ? state?.production_line_description : "",
  };
  const validationSchema = yup.object({
    production_line_name: yup.string("Enter Production Line Name").required("Production Line Name is required"),
  });
  const onPalleteSave = async (values) => {
    const body = { ...values };
    for (let key in body) {
      if (key != "production_line_description") {
        body[key] = body[key].toUpperCase();
      }
    }
    setSubmitting(true);
    if (pathname == "/master/pallet/edit") {
      const data = await updatePallet(body, state._id);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Pallet Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/pallet");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addProductionLine(body);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Pallet Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/pallet");
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
        {pathname == "/master/pallet/add" ? "Add New Production Line" : "Edit Production Line"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={pallets}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onPalleteSave}
          // onSubmit={(val) => console.log(val)}
        >
          {({ values, setFieldValue }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                {/* <Div
                  sx={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    columnGap: 5,
                  }}
                >
                 
                </Div> */}
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={4}>
                    <FormTextField1 name="production_line_name" label="Production Line Name*" />
                  </Grid>
    
                  <Grid item xs={4}>
                    <FormTextField1 name="production_line_description" label="Production Line Description" />
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
