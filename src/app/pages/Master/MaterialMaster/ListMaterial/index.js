import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { handleLogs } from "app/components/Function/logsDownloadFunction";
import { getAllSuppliers } from "app/redux/actions/masterAction";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListMaterialTable from "./materialTable";
import { Axios } from "index";
import AllApis from "app/Apis";
import Swal from "sweetalert2";

export default function ListMaterial() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [sortBy, setSortBy] = useState("updated_at");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );
  const [isLoading, setIsLoading] = useState(false);

  //debouncing for search
  const handleSearch = (value) => {
    setPage(1);
    dispatch(getAllSuppliers(value, sort, sortBy, 1));
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
    dispatch(getAllSuppliers(searchTerm, sort, sortBy, page));
  }, [sort, page]);

  const importMaterial = async (file) => {
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
      const response = await Axios.post(AllApis.bulk.material, formData, config);
      if (response?.data?.status === true) {
        dispatch(getAllSuppliers(searchTerm, sort, sortBy, page, ""));
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
    importMaterial(file);

    // Reset the file input value to allow multiple uploads
    e.target.value = null;
  };

  return (
    <Div sx={{ mt: -4 }}>
      <Typography variant="h1">Material Master</Typography>
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
              dispatch(getAllSuppliers("", "desc", "updated_at", 1));
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
          {permissions?.supplier_master_view == true && (
            <LoadingButton
              variant="contained"
              sx={{
                mr: 2,
                p: 1,
                pl: 4,
                pr: 4,
              }}
              onClick={() =>
                handleLogs("supplier-master/supplier-logs", "suppliers")
              }
            >
              Log
            </LoadingButton>
          )}

          {permissions?.material_master_create == true && (
            <Button
              variant="contained"
              sx={{ p: 1, pl: 4, pr: 4 }}
              onClick={() => navigate("/master/material/add")}
            >
              Add New Material
            </Button>
          )}
          {permissions?.material_master_create && (
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
      </Div>
      <ListMaterialTable
        searchTerm={searchTerm}
        setPage={setPage}
        page={page}
        sort={sort}
        sortBy={sortBy}
        setSort={setSort}
        setSortBy={setSortBy}
      />
    </Div>
  );
}
