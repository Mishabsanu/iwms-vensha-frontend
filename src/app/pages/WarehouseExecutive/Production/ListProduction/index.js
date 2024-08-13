import Div from "@jumbo/shared/Div/Div";
import { Suspense, useEffect, useState } from "react";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getAllProduction } from "app/redux/actions/masterAction";
import Documents1 from "app/shared/widgets/Documents1";
import { Axios } from "index";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListProductionTable from "./productiontable";
import SearchGlobal from "app/shared/SearchGlobal";
import axios from "axios";
import FilterAccordian from "app/components/FilterAccordian";
import AllApis from "app/Apis";

export default function ListProduction() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [sortBy, setSortBy] = useState("updated_at");
  const [productionList, setProductionList] = useState([]);
  const [filters, setFilters] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statusCount, setStatusCount] = useState({});
  console.log(statusCount, "statusCount");

  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  //debouncing for search
  const handleSearch = (value) => {
    setPage(1);
    dispatch(getAllProduction(value, sort, sortBy, 1));
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  useEffect(() => {
    debouncedHandleSearch(searchTerm);

    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    dispatch(getAllProduction(searchTerm, sort, sortBy, page));
    getAllStatusCount();
  }, [sort, page, searchTerm]);

  const getAllStatusCount = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      const body = {};
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/production/get-all-status-count`,
        body,
        config
      );
      // const response = await Axios.get(`/production/get-all-status-count`);
      setStatusCount(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFilter = () => {
  };
  const handleClear = () => {
    setFilters("");
  };
  useEffect(async () => {
    try {
      const list = await Axios.get(`${AllApis.dropdownList.production}`);
      setProductionList(list?.data?.result);
    } catch (error) {}
  }, []);
  return (
    <>
      <Div sx={{ mt: -4 }}>
        <Typography variant="h1">Production</Typography>
        <FilterAccordian
          heading={"Report"}
          actions={
            <Div>
              <Button
                variant="contained"
                sx={{ marginRight: 1 }}
                onClick={handleFilter}
              >
                Apply
              </Button>
              <Button variant="outlined" onClick={handleClear}>
                Clear
              </Button>
            </Div>
          }
        >
          <Box
            sx={{ display: "flex", rowGap: 2, flexWrap: "wrap", gap: "10px" }}
          >
            <Div
              sx={{
                width: { xs: "100%", sm: "50%", md: "33%", lg: "24%" }, // Adjust width at different breakpoints
                mb: { xs: 2, sm: 0 }, // Add margin at the bottom on smaller screens
              }}
            >
              <Autocomplete
                freeSolo
                sx={{ width: "100%", textTransform: "capitalize" }}
                size="small"
                id="company-autocomplete"
                options={productionList || []}
                getOptionLabel={(option) => option || ""}
                onChange={(e, newValue) => {
                  setFilters(newValue != null ? newValue : "");
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Prosess Order"
                  />
                )}
              />
            </Div>
          </Box>
        </FilterAccordian>
        <Div
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
            mt: 2,
          }}
        >
          <Grid container spacing={3.75} justifyContent="center">
            <Grid item maxWidth={600} xs={12} md={3}>
              <Documents1
                icone={<MeetingRoomIcon sx={{ fontSize: 36 }} />}
                field="Total Pending"
                data={statusCount?.pending}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Documents1
                icone={<PeopleAltIcon sx={{ fontSize: 36 }} />}
                field="Total Allocated"
                data={statusCount?.allocated}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Documents1
                icone={<PeopleAltIcon sx={{ fontSize: 36 }} />}
                field="Total Confirm"
                data={statusCount?.verified}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Documents1
                icone={<PeopleAltIcon sx={{ fontSize: 36 }} />}
                field="Total Deleted"
                data={statusCount?.deleted}
              />
            </Grid>
          </Grid>
        </Div>

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
          {permissions?.production_master_create && (
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
                onClick={() => navigate("/dashboard/addproduction")}
              >
                Add Production
              </Button>
            </Box>
          )}
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <ListProductionTable
            searchTerm={searchTerm}
            page={page}
            setPage={setPage}
            sort={sort}
            sortBy={sortBy}
            setSort={setSort}
            setSortBy={setSortBy}
            refreshStatusCounts={getAllStatusCount}
          />
        </Suspense>
      </Div>
    </>
  );
}
