import JumboDdMenu from "@jumbo/components/JumboDdMenu/JumboDdMenu";
import AutorenewIcon from "@mui/icons-material/Autorenew";
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
import { getAllVehicle } from "app/redux/actions/masterAction";
import { updateVendor } from "app/services/apis/updateVendor";
import { displayDateFun } from "app/utils/constants/functions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ListCustomerTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { customerMaster, TotalPage, loading } = useSelector(
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
        navigate("/master/vendor/edit", { state: menuItem?.data });
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
                  active={sortBy === "customer_code"}
                  direction={sort}
                  onClick={() => handleSort("customer_code")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white",
                    },
                  }}
                >
                  Customer Code
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
                <TableSortLabel
                  active={sortBy === "customer_name"}
                  direction={sort}
                  onClick={() => handleSort("customer_name")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white",
                    },
                  }}
                >
                  Customer Name
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
                Address
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
                City
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
                State
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
                Pin Code
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
                Contact Person
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
                Phone Number
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
                Email
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
                Vendor Type
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
                GST Number
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
                PAN Number
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
                Credit Limit
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
              {permissions?.customer_master_edit && (
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
            {customerMaster?.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.customer_code}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.customer_name}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row.address}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row.city}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row.state}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row.pin_code}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.contact_person}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.phone_number}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row.email}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.vendor_type}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.gst_number}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.pan_number}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.credit_limit}
                </TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {row?.created_employee_id?.first_name}{" "}
                  {row?.created_employee_id?.last_name}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {displayDateFun(row.created_at)}
                </TableCell>
                {permissions?.vendor_master_edit && (
                  <TableCell sx={{ textAlign: "left" }}>
                    <JumboDdMenu
                      icon={<MoreHorizIcon />}
                      menuItems={[
                        {
                          icon: <EditIcon />,
                          title: "Edit Customer Details",
                          action: "edit",
                          data: row,
                        },
                        {
                          icon: <AutorenewIcon />,
                          title: `${
                            row?.status === "active" ? "Deactivate" : "Activate"
                          }`,
                          action: "editStatus",
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
