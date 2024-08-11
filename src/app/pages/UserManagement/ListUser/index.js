import Div from "@jumbo/shared/Div/Div";
import { Suspense, useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { getAllUsers } from "app/redux/actions/userAction";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListUserTable from "./usertable";
import axios from "axios";
import { handleLogs } from "app/components/Function/logsDownloadFunction";
import { LoadingButton } from "@mui/lab";
import SearchGlobal from "app/shared/SearchGlobal";

export default function ListUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [sortBy, setSortBy] = useState("updated_at");
  const [logLoader, setLogLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );
  const { allUsers, TotalPage, loading } = useSelector(
    (state) => state.userReducer
  );

  //debouncing for search
  const handleSearch = (value) => {
    setPage(1);
    dispatch(getAllUsers(value, sort, sortBy, 1));
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  useEffect(() => {
    debouncedHandleSearch(searchTerm);
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    dispatch(getAllUsers(searchTerm, sort, sortBy, page));
  }, [sort, page]);

  return (
    <>
      <Div sx={{ mt: -4 }}>
        <Typography variant="h1">User Management </Typography>

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
          {permissions?.user_create && (
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
                onClick={() => navigate("/dashboard/adduser")}
              >
                Add User
              </Button>
            </Box>
          )}
        </Box>
        <Suspense fallback={<div>Loading...</div>}>
          <ListUserTable
            searchTerm={searchTerm}
            page={page}
            setPage={setPage}
            sort={sort}
            sortBy={sortBy}
            setSort={setSort}
            setSortBy={setSortBy}
          />
        </Suspense>
      </Div>
    </>
  );
}
