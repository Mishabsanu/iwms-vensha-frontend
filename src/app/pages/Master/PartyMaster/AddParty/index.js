import Div from "@jumbo/shared/Div";
import { Button, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

import { LoadingButton } from "@mui/lab";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addParty } from "app/services/apis/addParty";
import { updateParty } from "app/services/apis/updateParty";
import { useState } from "react";

export default function AddParty() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const party = {
    customer_name: state?.customer_name ? state?.customer_name : "",
    customer_place: state?.customer_place ? state?.customer_place : "",
  };
  const validationSchema = yup.object({
    customer_name: yup
      .string("Enter Customer Name")
      .required("Party Name is required"),
    customer_place: yup
      .string("Enter Customer Place")
      .required("Customer Place is required"),
  });
  const onUserSave = async (values) => {
    setSubmitting(true);
    if (pathname == "/master/party/edit") {
      const data = await updateParty(values, state._id);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Party Edited Successfully",
          text: "",
        });
        navigate("/dashboard/master/party");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addParty(values);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Party Added Successfully",
          text: "",
        });
        navigate("/dashboard/master/party");
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
        {pathname == "/master/party/add" ? "Add New Party" : "Edit Party"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={party}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onUserSave}
        >
          {({ values }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Div
                  sx={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    columnGap: 5,
                  }}
                >
                  <Grid container rowSpacing={3} columnSpacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                      <FormTextField1 name="customer_name" label="Party Name*" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <FormTextField1
                        name="customer_place"
                        label="Customer Place"
                      />
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
                          navigate("/dashboard/master/party");
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
