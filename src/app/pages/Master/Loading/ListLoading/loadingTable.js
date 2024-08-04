import JumboDdMenu from "@jumbo/components/JumboDdMenu/JumboDdMenu";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import FullScreenLoader from "app/components/ListingPageLoader";
import { displayDateFun } from "app/utils/constants/functions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ListLoadingTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { loadingMaster, TotalPage, loading } = useSelector(
    (state) => state.masterReducer
  );

  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  const handleSort = (property) => {
    setSort(sort === "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

  const handleItemAction = (menuItem) => {
    switch (menuItem.action) {
      case "edit":
        navigate("/master/loading/edit", { state: menuItem?.data });
        break;
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setLoader(loading);
  }, [loading]);

  return (
    <>
      {loader && <FullScreenLoader />}

      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#7352C7",
                color: "white",
                "& .MuiTableCell-root": {
                  py: 2,
                },
              }}
            >
              <TableCell
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white",
                  },
                }}
              >
                <TableSortLabel
                  active={sortBy === "vehicle_number"}
                  direction={sort}
                  onClick={() => handleSort("vehicle_number")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white",
                    },
                  }}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white",
                  },
                }}
              >
                Group
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white",
                  },
                }}
              >
                Truck
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white",
                  },
                }}
              >
                Truck Type
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white",
                  },
                }}
              >
                LR
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white",
                  },
                }}
              >
                Seal
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white",
                  },
                }}
              >
                Invoice
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white",
                  },
                }}
              >
                Invoice Value
              </TableCell>

              {permissions?.vehicle_master_edit && (
                <TableCell
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white",
                    },
                  }}
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingMaster?.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ textAlign: "left" }}>
                  {" "}
                  {displayDateFun(row.date)}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row.group}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.truck_number}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.truck_type}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row.lr}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row.seal}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row.invoice}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.invoice_value}
                </TableCell>

                {permissions?.loading_master_edit && (
                  <TableCell sx={{ textAlign: "left" }}>
                    <JumboDdMenu
                      icon={<MoreHorizIcon />}
                      menuItems={[
                        {
                          icon: <EditIcon />,
                          title: "Edit loading Details",
                          action: "edit",
                          data: row,
                        },
                      ]}
                      onClickCallback={handleItemAction}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          size="medium"
          count={TotalPage || 1}
          page={page}
          onChange={handleChangePage}
          sx={{
            position: "sticky",
            bottom: 0,
            left: 0,
            backgroundColor: "white",
            borderTop: "1px solid #ddd",
            py: 1,
          }}
        />
      </TableContainer>
    </>
  );
}

// import JumboDdMenu from "@jumbo/components/JumboDdMenu/JumboDdMenu";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
// import EditIcon from "@mui/icons-material/Edit";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import {
//   Pagination,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
// } from "@mui/material";
// import FullScreenLoader from "app/components/ListingPageLoader";
// import { getAllVehicle } from "app/redux/actions/masterAction";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// export default function ListVehicleTable({
//   searchTerm,
//   page,
//   setPage,
//   sort,
//   sortBy,
//   setSort,
//   setSortBy,
// }) {
//   const { vehicleMaster, TotalPage, loading } = useSelector(
//     (state) => state.masterReducer
//   );

//   const [loader, setLoader] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const permissions = useSelector(
//     (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
//   );

//   const handleSort = (property) => {
//     setSort(sort === "asc" ? "desc" : "asc");
//     setSortBy(property);
//     setPage(1);
//   };

//   const handleItemAction = (menuItem) => {
//     switch (menuItem.action) {
//       case "edit":
//         navigate("/master/vehicle/edit", { state: menuItem?.data });
//         break;
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   useEffect(() => {
//     setLoader(loading);
//   }, [loading]);

//   const dummyData = [
//     {
//       date: "2024-01-01",
//       group: "A",
//       truck: "KA05TY0856",
//       truckType: "Type 1",
//       lr: "LR 1",
//       seal: "Seal 1",
//       invoice: "INV001",
//       invoiceValue: "1000",
//     },
//     {
//       date: "2024-02-01",
//       group: "B",
//       truck: "KA05SY1245",
//       truckType: "Type 2",
//       lr: "LR 2",
//       seal: "Seal 2",
//       invoice: "INV002",
//       invoiceValue: "2000",
//     },
//     // Add more dummy rows as needed
//   ];

//   return (
//     <>
//       {loader && <FullScreenLoader />}

//       <TableContainer component={Paper} sx={{ width: "100%" }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow
//               sx={{
//                 bgcolor: "#7352C7",
//                 color: "white",
//                 "& .MuiTableCell-root": {
//                   py: 2,
//                 },
//               }}
//             >
//               <TableCell
//                 sx={{
//                   color: "white",
//                   "&:hover": { color: "white" },
//                   "&.MuiTableSortLabel-root.Mui-active": {
//                     color: "white",
//                   },
//                 }}
//               >
//                 <TableSortLabel
//                   active={sortBy === "vehicle_number"}
//                   direction={sort}
//                   onClick={() => handleSort("vehicle_number")}
//                   sx={{
//                     color: "white",
//                     "&:hover": { color: "white" },
//                     "&.MuiTableSortLabel-root.Mui-active": {
//                       color: "white",
//                     },
//                   }}
//                 >
//                    Date
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell
//                 sx={{
//                   color: "white",
//                   "&:hover": { color: "white" },
//                   "&.MuiTableSortLabel-root.Mui-active": {
//                     color: "white",
//                   },
//                 }}
//               >
//                 Group
//               </TableCell>
//               <TableCell
//                 sx={{
//                   color: "white",
//                   "&:hover": { color: "white" },
//                   "&.MuiTableSortLabel-root.Mui-active": {
//                     color: "white",
//                   },
//                 }}
//               >
//                 Truck
//               </TableCell>
//               <TableCell
//                 sx={{
//                   color: "white",
//                   "&:hover": { color: "white" },
//                   "&.MuiTableSortLabel-root.Mui-active": {
//                     color: "white",
//                   },
//                 }}
//               >
//                 Truck Type
//               </TableCell>
//               <TableCell
//                 sx={{
//                   color: "white",
//                   "&:hover": { color: "white" },
//                   "&.MuiTableSortLabel-root.Mui-active": {
//                     color: "white",
//                   },
//                 }}
//               >
//                 LR
//               </TableCell>
//               <TableCell
//                 sx={{
//                   color: "white",
//                   "&:hover": { color: "white" },
//                   "&.MuiTableSortLabel-root.Mui-active": {
//                     color: "white",
//                   },
//                 }}
//               >
//                 Seal
//               </TableCell>
//               <TableCell
//                 sx={{
//                   color: "white",
//                   "&:hover": { color: "white" },
//                   "&.MuiTableSortLabel-root.Mui-active": {
//                     color: "white",
//                   },
//                 }}
//               >
//                 Invoice
//               </TableCell>
//               <TableCell
//                 sx={{
//                   color: "white",
//                   "&:hover": { color: "white" },
//                   "&.MuiTableSortLabel-root.Mui-active": {
//                     color: "white",
//                   },
//                 }}
//               >
//                 Invoice Value
//               </TableCell>

//               {permissions?.vehicle_master_edit && (
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     "&:hover": { color: "white" },
//                     "&.MuiTableSortLabel-root.Mui-active": {
//                       color: "white",
//                     },
//                   }}
//                 >
//                   Action
//                 </TableCell>
//               )}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {dummyData.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell sx={{ textAlign: "left" }}>{row.date}</TableCell>
//                 <TableCell sx={{ textAlign: "left" }}>{row.group}</TableCell>
//                 <TableCell sx={{ textAlign: "left" }}>{row.truck}</TableCell>
//                 <TableCell sx={{ textAlign: "left" }}>{row.truckType}</TableCell>
//                 <TableCell sx={{ textAlign: "left" }}>{row.lr}</TableCell>
//                 <TableCell sx={{ textAlign: "left" }}>{row.seal}</TableCell>
//                 <TableCell sx={{ textAlign: "left" }}>{row.invoice}</TableCell>
//                 <TableCell sx={{ textAlign: "left" }}>{row.invoiceValue}</TableCell>
//                 {permissions?.vehicle_master_edit && (
//                   <TableCell sx={{ textAlign: "left" }}>
//                     <JumboDdMenu
//                       icon={<MoreHorizIcon />}
//                       menuItems={[
//                         {
//                           icon: <EditIcon />,
//                           title: "Edit loading Details",
//                           action: "edit",
//                           data: row,
//                         },
//                       ]}
//                       onClickCallback={handleItemAction}
//                     />
//                   </TableCell>
//                 )}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <Pagination
//           size="medium"
//           count={TotalPage || 1}
//           page={page}
//           onChange={handleChangePage}
//           sx={{
//             position: "sticky",
//             bottom: 0,
//             left: 0,
//             backgroundColor: "white",
//             borderTop: "1px solid #ddd",
//             py: 1,
//           }}
//         />
//       </TableContainer>
//     </>
//   );
// }
