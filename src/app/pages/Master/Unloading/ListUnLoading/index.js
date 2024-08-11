import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { getAllUnLoading } from "app/redux/actions/masterAction";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListUnLoadingTable from "./unLoadingTable";
import SearchGlobal from "app/shared/SearchGlobal";

export default function ListUnLoading() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [sortBy, setSortBy] = useState("updated_at");
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );


  const handleSearch = (value) => {
    setPage(1);
    dispatch(getAllUnLoading(value, sort, sortBy, 1));
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  useEffect(() => {
    debouncedHandleSearch(searchTerm);
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchTerm]);
  

  useEffect(() => {
    dispatch(getAllUnLoading(searchTerm, sort, sortBy, page));
  }, [sort, page]);
  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">UnLoading </Typography>
     
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          width: "100%",
          gap: { xs: 1, sm: 2, xl: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", sm: "auto" },
            mb: { xs: 2, sm: 0 },
            mt: { xs: 2, sm: 0, xl: 4 },
            flex: 1,
          }}
        >
          <SearchGlobal
            sx={{
              maxWidth: { xs: "100%", sm: 280, md: 320, xl: 400 },
              width: "100%",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        {permissions?.unloading_master_create && (
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
              width: { xs: "100%", xl: "auto" },
              mt: { xs: 2, sm: 0, xl: 4 },
            }}
          >
            <Button
              variant="contained"
              sx={{
                p: 1,
                pl: 4,
                pr: 4,
                width: { xs: "100%", sm: "auto" },
                maxWidth: { xs: "100%", sm: "200px", xl: "250px" },
                boxShadow: { xl: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
              }}
              onClick={() => navigate("/master/unloading/add")}
            >
              Add Unloading
            </Button>
          </Box>
        )}
      </Box>
      <ListUnLoadingTable
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
