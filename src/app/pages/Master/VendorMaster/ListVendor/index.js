import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { getAllVendor } from "app/redux/actions/masterAction";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListVendorTable from "./vendorTable";

export default function ListVendor() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [sortBy, setSortBy] = useState("updated_at");
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  //debouncing for search
  const handleSearch = (value) => {
    setPage(1);
    dispatch(getAllVendor(value, sort, sortBy, 1));
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  useEffect(() => {
    if (searchTerm !== "") {
      debouncedHandleSearch(searchTerm);
    }
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    dispatch(getAllVendor(searchTerm, sort, sortBy, page));
  }, [sort, page]);
  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">Vendor Master</Typography>
      <Div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          id="search"
          type="search"
          label="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value == "") {
              setSort("desc");
              setSortBy("updated_at");
              dispatch(getAllVendor("", "desc", "updated_at", 1));
            }
          }}
          sx={{ width: 300, mb: 5, mt: 4 }}
          InputProps={{
            endAdornment: (
              <Div sx={{ cursor: "pointer" }}>
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              </Div>
            ),
          }}
        />
        <Div>
          {permissions?.vendor_master_create == true && (
            <Button
              variant="contained"
              sx={{ p: 1, pl: 4, pr: 4 }}
              onClick={() => navigate("/master/vendor/add")}
            >
              Add New Vendor
            </Button>
          )}
        </Div>
      </Div>
      <ListVendorTable
        searchTerm={searchTerm}
        page={page}
        setPage={setPage}
        sort={sort}
        sortBy={sortBy}
        setSort={setSort}
        setSortBy={setSortBy}
      />
    </Div>
  );
}
