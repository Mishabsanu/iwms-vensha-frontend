import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {Autocomplete, Box, TextField} from "@mui/material";
import {countries} from "./data";
import Div from "@jumbo/shared/Div";
import code from "../AutoCompletes/demo-code/multiple-country.txt";

const MultipleCountrySelect = () => {
    return (
        <Autocomplete
        multiple
        id="tags-standard"
        options={fabricColor}
        getOptionLabel={(option) =>option.fabric_color}
        defaultValue={""}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
          {option.fabric_color}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Choose multiple fabricColor"
            placeholder="Favorites"
          />
        )}
      />
    );
};

export default MultipleCountrySelect;