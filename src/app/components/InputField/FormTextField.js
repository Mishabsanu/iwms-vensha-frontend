import React from "react";
import Typography from "@mui/material/Typography";
import { ErrorMessage } from "formik";
import Div from "@jumbo/shared/Div/Div";
import JumboAppTextField from "@jumbo/components/JumboAppTextField/JumboAppTextField";
import { outerDiv } from "app/utils/constants/dropdowns";

const FormTextField = ({
  label,
  name,
  type,
  onChange,
  error,
  status,
  helperText,
  value,
  accept,
  sx,
}) => {
  return (
    <Div sx={outerDiv}>

      <Typography variant="h5">{label ? `${label}*` : ``}</Typography>
      {type === "file" ? (
        <input
          type="file"
          id={name}
          name={name}
          accept={accept}
          onChange={onChange}
          sx={{
            width: "100%",
            fontSize: "1rem",
          }}
        />
      ) : (
        <JumboAppTextField
          multiline
          type={type}
          disabled={status}
          id={name}
          name={name}
          onChange={onChange}
          // variant="standard"
          sx={{
            width: "100%",
            ".css-17vd7jc-MuiInputBase-root-MuiOutlinedInput-root": {
              padding: 1,
              fontSize: "1rem",
            },

            ...sx,
          }}
        />
      )}
      <Div sx={{ height: "30px", mt: 0.5 }}>
        <ErrorMessage name={name} component="div" style={{ color: "red" }} />
        {error && <div style={{ color: "red" }}>{helperText}</div>}
      </Div>
    </Div>
  );
};

export default FormTextField;
