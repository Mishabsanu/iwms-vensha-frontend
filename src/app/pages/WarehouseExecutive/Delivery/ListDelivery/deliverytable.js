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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function ListDeliveryTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { truckLoading, TotalPage, loading } = useSelector(
    (state) => state.masterReducer
  );
  const [loader, setLoader] = useState(false);
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
        navigate("/warehouseexecutive/truck-loading/edit", {
          state: menuItem?.data,
        });
        break;
      default:
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
                  textAlign: "left",
                }}
              >
                <TableSortLabel
                  active={sortBy === "date"}
                  direction={sort}
                  onClick={() => handleSort("date")}
                  sx={{
                    //   maxWidth: "70px",
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
                  color: "white",
                  px: 1,
                }}
              >
                Delivery Number
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "150px",
                  verticalAlign: "middle",
                  color: "white",
                  px: 1,
                }}
              >
                Trip Sheet Number
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "160px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                <TableSortLabel
                  active={sortBy === "truck_number"}
                  direction={sort}
                  onClick={() => handleSort("truck_number")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Truck Number
                </TableSortLabel>
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "150px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                <TableSortLabel
                  active={sortBy === "truck_number"}
                  direction={sort}
                  onClick={() => handleSort("truck_number")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Truck Type
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  px: 1,
                  minWidth: "150px",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "transporter_name"}
                  direction={sort}
                  onClick={() => handleSort("transporter_name")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  {" "}
                  Transporter Name
                </TableSortLabel>
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "left",
                  color: "white",
                  minWidth: "150px",
                }}
              >
                Gross Weight
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "white",
                  minWidth: "150px",
                }}
              >
                Actual Weight
              </TableCell>

              {permissions?.security_edit == true && (
                <TableCell
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
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {truckLoading?.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ textAlign: "left" }}>
                  {displayDateFun(row.date)}
                </TableCell>
                <TableCell sx={{ textAlign: "left", px: 1 }}>
                  {row?.trip_number ? row?.trip_number : "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left", px: 1 }}>
                  {row?.trip_sheet_number ? row?.trip_sheet_number : "-"}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "left", textTransform: "capitalize" }}
                >
                  {row?.truck_number}{" "}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    px: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {row?.truck_type}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.transporter_name}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.gross_weight}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.actual_weight}
                </TableCell>

                {permissions?.security_edit == true && (
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
                          title: "Edit Details",
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
