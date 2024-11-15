import Div from "@jumbo/shared/Div";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import FullScreenLoader from "app/components/ListingPageLoader/index";
import { getAllOutbound } from "app/redux/actions/masterAction";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListOutboundSOTable from "./outboundSOTable";
import ListOutboundSTOTable from "./outboundSTOTable";

const InventoryList = () => {
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = React.useState(0);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [sortBy, setSortBy] = useState("updated_at");

  const [emptyVal, setEmptyVal] = useState();

  const navigate = useNavigate();
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );
  const { loading } = useSelector((state) => state.masterReducer);

  const dispatch = useDispatch();

  const TabChange = () => {
    setEmptyVal(!emptyVal);
    setPage(1);
    setSort("desc");
    setSortBy("updated_at");
    setSearchTerm("");
  };

  // navs and tab functionality
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    TabChange();
    if (newValue === 0) {
      const OrderType = "SO";
      dispatch(getAllOutbound("", sort, sortBy, page, OrderType));
    } else if (newValue === 1) {
      const OrderType = "STO";
      dispatch(getAllOutbound("", sort, sortBy, page, OrderType));
    }
  };

  useEffect(() => {
    if (value === 0) {
      const OrderType = "SO";
      dispatch(getAllOutbound(searchTerm, sort, sortBy, page, OrderType));
    } else if (value === 1) {
      const OrderType = "STO";
      dispatch(getAllOutbound(searchTerm, sort, sortBy, page, OrderType));
    }
  }, [sort, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <FullScreenLoader />}
      <Div sx={{ mt: -4 }}>
        <Typography variant="h1">Outbound</Typography>
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
          {permissions?.outbound_master_create && (
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
                onClick={() => navigate("/dashboard/addoutbound")}
              >
                Add Outbound
              </Button>
            </Box>
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="STO" {...a11yProps(0)} />
              <Tab label="SO" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            {loaded ? (
              <ListOutboundSTOTable
                searchTerm={searchTerm}
                page={page}
                setPage={setPage}
                sort={sort}
                sortBy={sortBy}
                setSort={setSort}
                setSortBy={setSortBy}
              />
            ) : (
              <FullScreenLoader />
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {loaded ? (
              <ListOutboundSOTable
                searchTerm={searchTerm}
                page={page}
                setPage={setPage}
                sort={sort}
                sortBy={sortBy}
                setSort={setSort}
                setSortBy={setSortBy}
              />
            ) : (
              <FullScreenLoader />
            )}
          </CustomTabPanel>
        </Box>
      </Div>
    </>
  );
};

export default InventoryList;
