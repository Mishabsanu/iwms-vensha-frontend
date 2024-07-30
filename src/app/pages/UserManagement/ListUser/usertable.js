import JumboDdMenu from "@jumbo/components/JumboDdMenu/JumboDdMenu";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ListUserTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUsers, TotalPage, loading } = useSelector(
    (state) => state.userReducer
  );

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
        navigate("/dashboard/edituser", { state: menuItem.data });
        break;
      case "configure":
        navigate("/changepassword", { state: menuItem.data });
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
            <TableRow sx={{
              bgcolor: "#7352C7", color: "white", "& .MuiTableCell-root": {
                py: 2,
              },
            }}>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "150px",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "employee_id"}
                  direction={sort}
                  onClick={() => handleSort("employee_id")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Employee ID
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
                  active={sortBy === "first_name"}
                  direction={sort}
                  onClick={() => handleSort("first_name")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  First Name
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
                  active={sortBy === "last_name"}
                  direction={sort}
                  onClick={() => handleSort("last_name")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "gender"}
                  direction={sort}
                  onClick={() => handleSort("gender")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Gender
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "age"}
                  direction={sort}
                  onClick={() => handleSort("age")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Age
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
                DOB
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "country"}
                  direction={sort}
                  onClick={() => handleSort("country")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Country
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "state"}
                  direction={sort}
                  onClick={() => handleSort("state")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  State
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "city"}
                  direction={sort}
                  onClick={() => handleSort("city")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  City
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "pincode"}
                  direction={sort}
                  onClick={() => handleSort("pincode")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Pincode
                </TableSortLabel>
              </TableCell>
              <TableCell
                active={sortBy === "mobile_no"}
                sx={{
                  textAlign: "left",
                  minWidth: "140px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Phone No
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
                  active={sortBy === "email_id"}
                  direction={sort}
                  onClick={() => handleSort("email_id")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Email ID
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
                  active={sortBy === "role_id.role_name"}
                  direction={sort}
                  onClick={() => handleSort("role_id.role_name")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Role
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
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "180px",
                  verticalAlign: "middle",
                  color: "white",
                  px: 1,
                }}
              >
                Remark
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "140px",
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
                  minWidth: "140px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Created Date
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "140px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Updated Date
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "40px",
                  verticalAlign: "middle",
                  color: "white",
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
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers?.map((row, i) => (
              <TableRow key={i}>
                <TableCell
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {row.employee_id}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.first_name}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.last_name}
                </TableCell>
                <TableCell sx={{ textAlign: "left", maxWidth: "80px" }}>
                  {row?.gender !== "Select" && row?.gender !== ""
                    ? row.gender
                    : "-"}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row?.age || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.dob ? displayDateFun(row?.dob) : "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.country !== "Select" && row?.country !== ""
                    ? row.country
                    : "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.state || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.city || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.pincode || "-"}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row?.mobile_no !== ""
                    ? `${row?.country_code} ${row?.mobile_no}`
                    : "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row.email_id}</TableCell>
                <TableCell sx={{ textAlign: "left", maxWidth: "80px" }}>
                  {row.role_id.role_name || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.status === false ? "Inactive" : "Active"}
                  {/* {row.status} */}
                  {/* {console.log(row.status + "status")} */}
                </TableCell>
                <TableCell sx={{ textAlign: "left", px: 1 }}>
                  {row?.user_remarks ? row?.user_remarks : "-"}
                </TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {/*  {row?.created_employee_id?.first_name}{" "}
                  {row?.created_employee_id?.last_name} ?   {row?.created_employee_id?.first_name}{" "}
                  {row?.created_employee_id?.last_name} : "null"} */}
                  {row?.created_employee_id?.first_name}{" "}
                  {row?.created_employee_id?.last_name}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {displayDateFun(row.created_at)}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.updated_at == null
                    ? "N/A"
                    : displayDateFun(row.updated_at)}
                  {/* // : displayDateFun(row.user_update_date)} */}
                </TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination size="medium"
          count={TotalPage || 1}
          page={page}
          onChange={handleChangePage}
          sx={{
            position: "sticky",
            bottom: 0,
            left: 0,
            backgroundColor: "white",
            borderTop: "1px solid #ddd",
            py:1
          }}
        />
      </TableContainer>
    </>
  );
}
