import Div from "@jumbo/shared/Div";
import { Button, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { LoadingButton } from "@mui/lab";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addItemName } from "app/services/apis/addItemName";
import { updateItemName } from "app/services/apis/updateUnLoading";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddItemName() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const itemName = {
    item_name: state?.item_name ? state?.item_name : "",
    item_name_remarks: state?.item_name_remarks ? state?.item_name_remarks : "",
  };
  const validationSchema = yup.object({
    item_name: yup.string("Enter Item Name").required("Item Name is required"),
  });
  const onUserSave = async (values) => {
    const body = { ...values };
    for (let key in body) {
      if (key != "item_name_remarks") {
        body[key] = body[key].toUpperCase();
      }
    }
    setSubmitting(true);
    if (pathname == "/master/item-name/edit") {
      const data = await updateItemName(body, state._id);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Item Name Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/item-name");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addItemName(body);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Item Name Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/item-name");
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
        {pathname == "/master/item-name/add"
          ? "Add New Item Name"
          : "Edit Item Name"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={itemName}
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
                    <Grid item xs={4}>
                      <FormTextField1 name="item_name" label="Item Name*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1
                        name="item_name_remarks"
                        label="Remarks"
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
                          navigate("/dashboard/master/item-name");
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
