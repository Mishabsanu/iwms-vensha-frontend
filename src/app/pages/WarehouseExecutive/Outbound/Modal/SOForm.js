import {
  Grid,
  FormControl,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { FieldArray } from "formik";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const SOForm = ({ values, setFieldValue, errors, touched }) => (
  <>
    <Grid container rowSpacing={3} columnSpacing={3}>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
        <FormControl fullWidth>
          <TextField
            label="Customer Name *"
            name="entity_name"
            value={values.entity_name}
            onChange={(e) => setFieldValue("entity_name", e.target.value)}
            select
            fullWidth
            error={touched.entity_name && Boolean(errors.entity_name)}
            helperText={touched.entity_name && errors.entity_name}
          >
            <MenuItem value="">Select</MenuItem>
          </TextField>
        </FormControl>
      </Grid>
    </Grid>

    <Typography variant="h4">SKU Details</Typography>
    <FieldArray name="skus">
      {({ push, remove }) => (
        <>
          {values.skus.map((sku, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              {/* Add SKU form fields */}
              <Grid item xs={12} sm={2}>
                <IconButton
                  onClick={() => remove(index)}
                  disabled={values.skus.length === 1}
                >
                  <RemoveIcon />
                </IconButton>
                {index === values.skus.length - 1 && (
                  <IconButton
                    onClick={() =>
                      push({
                        sku_code: "",
                        sku_description: "",
                        sut: "",
                        stock_qty: "",
                      })
                    }
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </FieldArray>
  </>
);

export default SOForm;
