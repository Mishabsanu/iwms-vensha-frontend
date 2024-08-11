import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { getAllVehicle } from "app/redux/actions/masterAction";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListVehicleTable from "./vehicleTable";
import SearchGlobal from "app/shared/SearchGlobal";

export default function ListVehicle() {
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
    dispatch(getAllVehicle(value, sort, sortBy, 1));
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
    dispatch(getAllVehicle(searchTerm, sort, sortBy, page));
  }, [sort, page]);
  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">Vehicle Master</Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          width: "100%",
          gap: { xs: 1, sm: 2 },
        }}
      >
        <SearchGlobal
          sx={{
            maxWidth: { xs: 240, sm: 280, md: 320 },
            mb: { xs: 2, sm: 0 },
            mt: 4,
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {permissions?.vehicle_master_create && (
          <Button
            variant="contained"
            sx={{
              p: 1,
              pl: 4,
              pr: 4,
              ml: { xs: 0, sm: "auto" },
              mt: { xs: 0, sm: "auto" },
            }}
            onClick={() => navigate("/master/vehicle/add")}
          >
            Add New Vehicle
          </Button>
        )}
      </Box>
      <ListVehicleTable
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
