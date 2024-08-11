import React from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from './style';
import SearchIcon from '@mui/icons-material/Search';

const SearchGlobal = ({ sx, value, onChange }) => {
  return (
    <Search sx={sx}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search...."
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={onChange}
      />
    </Search>
  );
};

export default SearchGlobal;
