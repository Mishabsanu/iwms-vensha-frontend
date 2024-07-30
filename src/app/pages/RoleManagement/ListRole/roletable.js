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

import SettingsIcon from "@mui/icons-material/Settings";

import { displayDateFun } from "app/utils/constants/functions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "app/components/ListingPageLoader";
export default function ListRoleTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { allRoles, TotalPage, loading } = useSelector(
    (state) => state.roleReducer
  );
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                  active={sortBy === "role_name"}
                  direction={sort}
                  onClick={() => handleSort("role_name")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Role Name
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
                  active={sortBy === "created_employee_id.first_name"}
                  direction={sort}
                  onClick={() => handleSort("created_employee_id.first_name")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Created By
                </TableSortLabel>
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "80px",
                  verticalAlign: "middle",
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
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "180px",
                  verticalAlign: "middle",
                  color: "white",
                  px: 1,
                }}
              >
                Remarks
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "80px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Created Date
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "80px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Updated Date
              </TableCell>
              {permissions?.role_edit == true && (
                <TableCell
                  sx={{
                    textAlign: "left",
                    minWidth: "40px",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                >
                  Configure
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {allRoles?.map((row, i) => (
              <TableRow key={i}>
                {/* <TableCell
                sx={{
                  textAlign: "left",
                  pl: 5,
                }}
              >
                {row._id}
              </TableCell> */}
                <TableCell sx={{ textAlign: "left" }}>
                  {row.role_name}
                </TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {row?.created_employee_id?.first_name}{" "}
                  {row?.created_employee_id?.last_name}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row.status === false ? "Inactive" : "Active"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.roles_remarks ? row?.roles_remarks : "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {displayDateFun(row.created_at)}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.updated_at ? displayDateFun(row.updated_at) : "N/A"}
                </TableCell>
                {permissions.role_edit == true && (
                  <TableCell sx={{ textAlign: "left", pl: 5 }}>
                    <SettingsIcon
                      sx={{ "&:hover": { cursor: "pointer", color: "black" } }}
                      onClick={() => {
                        navigate("/dashboard/editrole", { state: row });
                      }}
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
