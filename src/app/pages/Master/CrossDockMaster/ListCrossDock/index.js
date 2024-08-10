import Div from "@jumbo/shared/Div";
import {
  Box,
  Button,
  Typography
} from "@mui/material";
import { getAllCrossDock } from "app/redux/actions/masterAction";
import SearchGlobal from "app/shared/SearchGlobal";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CrossDockTable from "./crossDockTable";

export default function ListCrossDock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [sortBy, setSortBy] = useState("updated_at");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  // Debounced search handling
  const handleSearch = (value) => {
    setPage(1);
    dispatch(getAllCrossDock(value, sort, sortBy, 1));
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  useEffect(() => {
    if (searchTerm !== "") {
      debouncedHandleSearch(searchTerm);
    } else {
      dispatch(getAllCrossDock("", "desc", "updated_at", 1));
    }
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    dispatch(getAllCrossDock(searchTerm, sort, sortBy, page));
  }, [sort, page]);

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1" sx={{ mb: 4 }}>
        Cross Dock Master
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          width: "100%",
        }}
      >
        {/* <TextField
          size="small"
          id="search"
          type="search"
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: "100%", sm: "auto" }, maxWidth: 300, mb: { xs: 2, sm: 0 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}
        <SearchGlobal
          sx={{
            maxWidth: { xs: 240, md: 320 },
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {permissions?.cross_dock_master_create && (
          <Button
            variant="contained"
            sx={{ p: 1, pl: 4, pr: 4, ml: { xs: 0, sm: "auto" } }}
            onClick={() => navigate("/master/cross-dock/add")}
          >
            Add Cross Dock
          </Button>
        )}
      </Box>
      <CrossDockTable
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
