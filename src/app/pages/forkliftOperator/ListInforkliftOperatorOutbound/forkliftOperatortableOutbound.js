import JumboDdMenu from "@jumbo/components/JumboDdMenu";
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
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BinNumberModal from "../Modal/verifyModal";
import OutboundVerify from "../Modal/outboundVerify";
export default function ListForkliftOperatorOutboundTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { forkliftOperatorOutbound, TotalPage, loading } = useSelector(
    (state) => state.masterReducer
  );
console.log(forkliftOperatorOutbound,'forkliftOperatorOutbound');
  const user = useSelector((state) => state?.userReducer.user[0]);
  const isAdmin = user?.role_id.role_name === "Admin";

  // Otherwise, filter by assigned_user._id
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );
  const handleSort = (property) => {
    setSort(sort == "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

  const handleItemAction = (menuItem) => {
    switch (menuItem.action) {
      case "edit":
        setSelectedRow(menuItem.data);
        setModalOpen(true);
        break;
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {loading && <FullScreenLoader />}

      <TableContainer component={Paper}>
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
                  textAlign: "left",
                  minWidth: "150px",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "Date"}
                  direction={sort}
                  onClick={() => handleSort("Date")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "150px",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "process_order"}
                  direction={sort}
                  onClick={() => handleSort("process_order")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                 Order Type
                </TableSortLabel>
              </TableCell>
              
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "150px",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "process_order"}
                  direction={sort}
                  onClick={() => handleSort("process_order")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                 Order Number
                </TableSortLabel>
              </TableCell>
              
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "150px",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "SKU_Code"}
                  direction={sort}
                  onClick={() => handleSort("SKU_Code")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  SKU Code
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "Sku_Description"}
                  direction={sort}
                  onClick={() => handleSort("Sku_Description")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Sku Description
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "SUT"}
                  direction={sort}
                  onClick={() => handleSort("SUT")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  SUT
                </TableSortLabel>
              </TableCell>
              

              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "Pallet_Qty"}
                  direction={sort}
                  onClick={() => handleSort("Pallet_Qty")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Stock Qty
                </TableSortLabel>
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "Pallet_Qty"}
                  direction={sort}
                  onClick={() => handleSort("Pallet_Qty")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Pallet Qty
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "Transfer_Order"}
                  direction={sort}
                  onClick={() => handleSort("Transfer_Order")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Coustomer Name
                </TableSortLabel>
              </TableCell>
              
              {isAdmin ? (
                <TableCell
                  sx={{
                    textAlign: "left",
                    verticalAlign: "middle",
                  }}
                >
                  <TableSortLabel
                    active={sortBy === "Assigned_To"}
                    direction={sort}
                    onClick={() => handleSort("Assigned_To")}
                    sx={{
                      color: "white",
                      "&:hover": { color: "white" },
                      "&.MuiTableSortLabel-root.Mui-active": {
                        color: "white", // Set the color for the active state
                      },
                    }}
                  >
                    Assigned To
                  </TableSortLabel>
                </TableCell>
              ) : (
                ""
              )}
               <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "Batch"}
                  direction={sort}
                  onClick={() => handleSort("Batch")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Batch
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "Bin"}
                  direction={sort}
                  onClick={() => handleSort("Bin")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Bin
                </TableSortLabel>
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "80px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                <TableSortLabel
                  active={sortBy === "status"}
                  direction={sort}
                  onClick={() => handleSort("status")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              {permissions?.forklift_operator_master_edit == true && (
                <TableCell
                  sx={{
                    textAlign: "left",
                    minWidth: "80px",
                    verticalAlign: "middle",
                    color: "white",
                    position: "sticky",
                    right: 0,
                    height: "58px",
                    zIndex: 1,
                    bgcolor: "#7352C7",
                  }}
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {forkliftOperatorOutbound?.map((row, i) => (
              <TableRow key={i}>
                <TableCell
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {displayDateFun(row.date)}
                </TableCell>
                
                <TableCell sx={{ textAlign: "left" }}>
                  {row.order_type}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.order_number}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.sku_code}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.sku_description}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row?.sut || "-"}
                </TableCell>
                
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.order_qty}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.quantity}
                </TableCell>
                
                {/* {isAdmin ? (
                  <TableCell sx={{ textAlign: "left" }}>
                    {`${row?.assigned_user.first_name} ${row?.assigned_user.last_name}` ||
                      "-"}
                  </TableCell>
                ) : (
                  ""
                )} */}
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.customerDetails }
                </TableCell>

               <TableCell sx={{ textAlign: "left" }}>
               {`${row?.assigned_user.first_name} ${row?.assigned_user.last_name}` ||
                      "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.batch || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.bin || "-"}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row?.status || "-"}
                </TableCell>
                {permissions?.forklift_operator_master_edit == true && (
                  <TableCell
                    sx={{
                      textAlign: "left",
                      px: 1,
                      position: "sticky",
                      right: 0,
                      zIndex: 1,
                      bgcolor: "white",
                    }}
                  >
                    <JumboDdMenu
                      icon={<MoreHorizIcon />}
                      menuItems={[
                        {
                          icon: <EditIcon />,
                          title: "Confirm",
                          action: "edit",
                          data: row,
                        },
                      ]}
                      onClickCallback={handleItemAction}
                    />
                  </TableCell>
                )}
                {selectedRow && (
                  <OutboundVerify
                    open={modalOpen}
                    rawData={selectedRow}
                    onClose={() => setModalOpen(false)}
                  />
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
