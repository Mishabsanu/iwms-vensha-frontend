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
import { useSelector } from "react-redux";
export default function ListAllocateBinTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { binTableMaster, TotalPage, loading } = useSelector(
    (state) => state.masterReducer
  );

  const handleSort = (property) => {
    setSort(sort == "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
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
                  active={sortBy === "storage_type"}
                  direction={sort}
                  onClick={() => handleSort("storage_type")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Storage Type
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
                  active={sortBy === "storage_section"}
                  direction={sort}
                  onClick={() => handleSort("storage_section")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Storage Section
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
                  active={sortBy === "bin_no"}
                  direction={sort}
                  onClick={() => handleSort("bin_no")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Bin Number
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
                  active={sortBy === "description"}
                  direction={sort}
                  onClick={() => handleSort("description")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  description
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "bin_capacity"}
                  direction={sort}
                  onClick={() => handleSort("bin_capacity")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Bin Capacity
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "Code3Digit"}
                  direction={sort}
                  onClick={() => handleSort("Code3Digit")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  3 Digit Code
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                  color: "white",
                  minWidth: "120px",
                }}
              >
                Inbound Transfer Order
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "batch"}
                  direction={sort}
                  onClick={() => handleSort("batch")}
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
                  active={sortBy === "sku_code"}
                  direction={sort}
                  onClick={() => handleSort("sku_code")}
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
                  active={sortBy === "outbound_transfer_order"}
                  direction={sort}
                  onClick={() => handleSort("outbound_transfer_order")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Outbound Transfer Order
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
                  active={sortBy === "available_capacity"}
                  direction={sort}
                  onClick={() => handleSort("available_capacity")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Available Capacity
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
                  active={sortBy === "Status"}
                  direction={sort}
                  onClick={() => handleSort("Status")}
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

              {/* <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "40px",
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
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {binTableMaster?.map((row, i) => (
              <TableRow key={i}>
                <TableCell
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {row?.storage_type || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.storage_section || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.bin_no || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.description || "-"}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row?.bin_capacity || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.digit_3_codes || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.inbound_transfer_order || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.batch || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.sku_code || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.outbound_transfer_order || "-"}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row?.available_capacity ?? 0}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row?.status}</TableCell>

                {/* <TableCell
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
                    menuItems={
                      permissions.user_edit == true
                        ? [
                            {
                              icon: <EditIcon />,
                              title: "Edit User Details",
                              action: "edit",
                              data: row,
                            },
                            {
                              icon: <SettingsIcon />,
                              title: "Change Password",
                              action: "configure",
                              data: row,
                            },
                          ]
                        : [{ title: "No Actions" }]
                    }
                    onClickCallback={handleItemAction}
                  />
                </TableCell> */}
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
