import Div from "@jumbo/shared/Div/Div";
import { Suspense, useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { getAllStorageType } from "app/redux/actions/masterAction";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import ListBinTable from "./bintable";
import Swal from "sweetalert2";
import { Axios } from "index";
import AllApis from "app/Apis";

export default function ListBins() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [sortBy, setSortBy] = useState("updated_at");
  const dispatch = useDispatch();
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );
  const [isLoading, setIsLoading] = useState(false);

  //debouncing for search
  const handleSearch = (value) => {
    setPage(1);
    dispatch(getAllStorageType(value, sort, sortBy, 1));
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
    dispatch(getAllStorageType(searchTerm, sort, sortBy, page));
  }, [sort, page]);
  const importRawMaterial = async (file) => {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
        "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
      },
    };
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("excelFile", file); // Append your Excel file to the FormData
      const response = await Axios.post(AllApis.bulk.bin, formData, config);
      if (response?.data?.status === true) {
        dispatch(getAllStorageType(searchTerm, sort, sortBy, page, ""));
        Swal.fire({
          title: "Uploaded",
          icon: "success",
          timer: 5000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: error?.response?.data?.message,
        icon: "error",
        timer: 5000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    importRawMaterial(file);

    // Reset the file input value to allow multiple uploads
    e.target.value = null;
  };
  return (
    <>
      <Div sx={{ mt: -4 }}>
        <Typography variant="h1">BIN TABLE </Typography>
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
                dispatch(getAllStorageType("", "desc", "updated_at", 1));
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
          {/* <Div>
            {permissions?.user_view == true && (
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
            )}

            {permissions?.material_master_create == true && (
              <Button
                variant="contained"
                sx={{ p: 1, pl: 4, pr: 4 }}
                onClick={() => navigate("/dashboard/addproduction")}
              >
                Add Production
              </Button>
            )}
          </Div> */}
          {permissions?.material_master_view && (
            <Div>
              <form>
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="fileInput"
                />
                <label htmlFor="fileInput">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    component="span"
                    sx={{ height: "100%" }}
                  >
                    Import
                  </Button>
                </label>
              </form>
            </Div>
          )}
        </Div>
        <Suspense fallback={<div>Loading...</div>}>
          <ListBinTable
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
