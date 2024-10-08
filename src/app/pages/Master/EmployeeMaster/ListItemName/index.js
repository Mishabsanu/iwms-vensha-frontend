import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import AllApis from "app/Apis";
import FullScreenLoader from "app/components/ListingPageLoader";
import { getAllItemName } from "app/redux/actions/masterAction";
import { Axios } from "index";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ListItemNameTable from "./itemNameTable";
import { LoadingButton } from "@mui/lab";
import { handleLogs } from "app/components/Function/logsDownloadFunction";

export default function ListItemName() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [sortBy, setSortBy] = useState("updated_at");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  //debouncing for search
  const handleSearch = (value) => {
    setPage(1);
    dispatch(getAllItemName(value, sort, sortBy, 1));
  };

  const importItemName = async (file) => {
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

      const response = await Axios.post(
        AllApis.bulk.itemName,
        formData,
        config
      );
      if (response?.data?.status === true) {
        dispatch(getAllItemName(searchTerm, sort, sortBy, page));
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
    importItemName(file);

    // Reset the file input value to allow multiple uploads
    e.target.value = null;
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  useEffect(() => {
    debouncedHandleSearch(searchTerm);
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchTerm]);
  

  useEffect(() => {
    dispatch(getAllItemName(searchTerm, sort, sortBy, page));
  }, [sort, page]);

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <Div sx={{ mt: -4 }}>
        <Typography variant="h1">Item Name Master</Typography>
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
                dispatch(getAllItemName("", "desc", "updated_at", 1));
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
          <Div
            sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}
          >
            {permissions?.item_name_master_view == true && (
              <LoadingButton
                variant="contained"
                sx={{
                  mr: 2,
                  p: 1,
                  pl: 4,
                  pr: 4,
                }}
                onClick={() => handleLogs("item-name-master/itemNames-logs", "item Names")}
              >
                Log
              </LoadingButton>
            )}
            {permissions?.item_name_master_create == true && (
              <>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ p: 1, pl: 4, pr: 4 }}
                  onClick={() => navigate("/master/item-name/add")}
                >
                  Add New Item Name
                </Button>
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
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Import
                      </Button>
                    </label>
                  </form>
                </Div>
              </>
            )}
          </Div>
        </Div>
        <ListItemNameTable
          searchTerm={searchTerm}
          page={page}
          setPage={setPage}
          sort={sort}
          sortBy={sortBy}
          setSort={setSort}
          setSortBy={setSortBy}
        />
      </Div>
    </>
  );
}
