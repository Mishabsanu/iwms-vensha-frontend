// import Div from "@jumbo/shared/Div/Div";
// import { Suspense, useEffect, useState } from "react";

// import {
//   Box,
//   Typography
// } from "@mui/material";
// import AllApis from "app/Apis";
// import { getAllTransaction } from "app/redux/actions/masterAction";
// import SearchGlobal from "app/shared/SearchGlobal";
// import { Axios } from "index";
// import { debounce } from "lodash";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import ListTransferOrderTable from "./transferOrdertable";

// export default function ListTransferOrderOutbound() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [sort, setSort] = useState("desc");
//   const [sortBy, setSortBy] = useState("updated_at");
//   const [logLoader, setLogLoader] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const permissions = useSelector(
//     (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
//   );
//   const [isLoading, setIsLoading] = useState(false);

//   //debouncing for search
//   const handleSearch = (value) => {
//     setPage(1);
//     dispatch(getAllTransaction(value, sort, sortBy, 1));
//   };
//   const importRawMaterial = async (file) => {
//     const config = {
//       withCredentials: true,
//       headers: {
//         withCredentials: true,
//         "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
//       },
//     };
//     setIsLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("excelFile", file); // Append your Excel file to the FormData

//       const response = await Axios.post(AllApis.bulk.raw, formData, config);
//       if (response?.data?.status === true) {
//         dispatch(getAllTransaction(searchTerm, sort, sortBy, page, ""));
//         Swal.fire({
//           title: "Uploaded",
//           icon: "success",
//           timer: 5000,
//           showConfirmButton: false,
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: error?.response?.data?.message,
//         icon: "error",
//         timer: 5000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     importRawMaterial(file);

//     // Reset the file input value to allow multiple uploads
//     e.target.value = null;
//   };
//   const debouncedHandleSearch = debounce(handleSearch, 500);

//   useEffect(() => {
//     debouncedHandleSearch(searchTerm);
//     return () => {
//       debouncedHandleSearch.cancel();
//     };
//   }, [searchTerm]);

//   useEffect(() => {
//     dispatch(getAllTransaction(searchTerm, sort, sortBy, page));
//   }, [sort, page]);

//   return (
//     <>
//       <Div sx={{ mt: -4 }}>
//         <Typography variant="h1">Transaction Outbound</Typography>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", sm: "row" },
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//             width: "100%",
//             gap: { xs: 1, sm: 2, xl: 3 },
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               width: { xs: "100%", sm: "auto" },
//               mb: { xs: 2, sm: 0 },
//               mt: { xs: 2, sm: 0, xl: 4 },
//               flex: 1,
//             }}
//           >
//             <SearchGlobal
//               sx={{
//                 maxWidth: { xs: "100%", sm: 280, md: 320, xl: 400 },
//                 width: "100%",
//               }}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Box>
//         </Box>
//         <Suspense fallback={<div>Loading...</div>}>
//           <ListTransferOrderTable
//             searchTerm={searchTerm}
//             page={page}
//             setPage={setPage}
//             sort={sort}
//             sortBy={sortBy}
//             setSort={setSort}
//             setSortBy={setSortBy}
//           />
//         </Suspense>
//       </Div>
//     </>
//   );
// }
import Div from "@jumbo/shared/Div";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import FullScreenLoader from "app/components/ListingPageLoader/index";
import { getAllTransactionOutbond } from "app/redux/actions/masterAction";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListOutboundSTOTable from "./transactionOutboundSTOTable";
import ListOutboundSOTable from "./transactionOutboundSOTable";

const ListTransferOrderOutbound = () => {
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
      dispatch(getAllTransactionOutbond("", sort, sortBy, page, OrderType));
    } else if (newValue === 1) {
      const OrderType = "STO";
      dispatch(getAllTransactionOutbond("", sort, sortBy, page, OrderType));
    }
  };

  useEffect(() => {
    if (value === 0) {
      const OrderType = "SO";
      dispatch(
        getAllTransactionOutbond(searchTerm, sort, sortBy, page, OrderType)
      );
    } else if (value === 1) {
      const OrderType = "STO";
      dispatch(
        getAllTransactionOutbond(searchTerm, sort, sortBy, page, OrderType)
      );
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
        <Typography variant="h1">TransferOrder Outbound</Typography>
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

export default ListTransferOrderOutbound;
