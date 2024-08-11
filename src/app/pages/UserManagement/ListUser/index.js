import Div from "@jumbo/shared/Div/Div";
import { Suspense, useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { getAllUsers } from "app/redux/actions/userAction";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListUserTable from "./usertable";
import axios from "axios";
import { handleLogs } from "app/components/Function/logsDownloadFunction";
import { LoadingButton } from "@mui/lab";

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
                dispatch(getAllUsers("", "desc", "updated_at", 1));
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
            {/* {permissions?.user_view == true && (
              <LoadingButton
                variant="contained"
                sx={{
                  mr: 2,
                  p: 1,
                  pl: 4,
                  pr: 4,
                }}
                onClick={() => handleLogs("user/user-logs", "users")}
              >
                Log
              </LoadingButton>
            )} */}

            {permissions?.user_create == true && (
              <Button
                variant="contained"
                sx={{ p: 1, pl: 4, pr: 4 }}
                onClick={() => navigate("/dashboard/adduser")}
              >
                Add User
              </Button>
            )}
          </Div>
        </Div>
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
