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
export default function ListProductionTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { partyMaster, TotalPage, loading } = useSelector(
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
                  active={sortBy === "StorageType"}
                  direction={sort}
                  onClick={() => handleSort("StorageType")}
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
                  active={sortBy === "StorageSection"}
                  direction={sort}
                  onClick={() => handleSort("StorageSection")}
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
                  active={sortBy === "BinNumber"}
                  direction={sort}
                  onClick={() => handleSort("BinNumber")}
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
                  active={sortBy === "Description"}
                  direction={sort}
                  onClick={() => handleSort("Description")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "BinCapacity"}
                  direction={sort}
                  onClick={() => handleSort("BinCapacity")}
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
                  active={sortBy === "SkuCode"}
                  direction={sort}
                  onClick={() => handleSort("SkuCode")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Sku Code
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "OutboundTransfeOrder"}
                  direction={sort}
                  onClick={() => handleSort("OutboundTransfeOrder")}
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
                  active={sortBy === "AvailableCapacity"}
                  direction={sort}
                  onClick={() => handleSort("AvailableCapacity")}
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
            {partyMaster?.map((row, i) => (
              <TableRow key={i}>
                <TableCell
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {row?.StorageType || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.StorageSection || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.BinNumber || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.Description || "-"}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row?.BinCapacity || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.Code3Digit || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.InboundTransferOrder || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.Batch || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.SkuCode || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.OutboundTransfeOrder || "-"}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row?.AvailableCapacity ?? 0}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row?.Status}</TableCell>

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
