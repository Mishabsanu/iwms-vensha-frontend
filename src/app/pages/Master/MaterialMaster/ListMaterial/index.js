import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
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
import SearchGlobal from "app/shared/SearchGlobal";

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
    debouncedHandleSearch(searchTerm);
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
      const response = await Axios.post(
        AllApis.bulk.material,
        formData,
        config
      );
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
      <Typography variant="h1" sx={{ mb: 2 }}>
        Material Master
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
          width: "100%",
          gap: { xs: 2, sm: 2, xl: 3 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: { xs: "100%", sm: "auto" },
            mt: { xs: 2, sm: 0, xl: 4 },
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
        {permissions?.material_master_create && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: { xs: "flex-start", sm: "flex-end" },
              width: { xs: "100%", xl: "auto" },
              gap: 2,
              mt: { xs: 2, sm: 0, xl: 4 },
            }}
          >
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
                  sx={{
                    p: 1,
                    pl: 4,
                    pr: 4,
                    width: { xs: "100%", sm: "auto" },
                    maxWidth: { xs: "100%", sm: "200px", xl: "250px" },
                    boxShadow: { xl: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
                  }}
                >
                  Import
                </Button>
              </label>
            </form>
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
              onClick={() => navigate("/master/material/add")}
            >
              Add New Material
            </Button>
          </Box>
        )}
      </Box>
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
