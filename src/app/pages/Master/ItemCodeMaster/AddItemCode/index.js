import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import FormTextField1 from "app/components/InputField/FormTextField1";
import { addItemCode } from "app/services/apis/addItemCode";
import { updateItemCode } from "app/services/apis/updateItemCode";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function AddItemCode() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const itemCode = {
    item_code: state?.item_code ? state?.item_code : "",
    item_code_remarks: state?.item_code_remarks ? state?.item_code_remarks : "",
  };
  const validationSchema = yup.object({
    item_code: yup.string("Enter Item Type").required("Item Type is required"),
  });
  const onUserSave = async (values) => {
    const body = { ...values };
    for (let key in body) {
      if (key != "item_code_remarks") {
        body[key] = body[key].toUpperCase();
      }
    }
    setSubmitting(true);
    if (pathname == "/master/item-code/edit") {
      const data = await updateItemCode(body, state._id);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Item Type Edited Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/item-code");
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: "",
        });
      }
    } else {
      const data = await addItemCode(body);
      if (data?.data?.status == true) {
        Swal.fire({
          icon: "success",
          title: "Item Type Added Successfully",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/dashboard/master/item-code");
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
        {pathname == "/master/item-code/add"
          ? "Add New Item Type"
          : "Edit Item Type"}
      </Typography>
      <Div>
        <Formik
          validateOnChange={true}
          initialValues={itemCode}
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
                      <FormTextField1 name="item_code" label="Item Type*" />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField1
                        name="item_code_remarks"
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
                          navigate("/dashboard/master/item-code");
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
