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
import { getAllVendor } from "app/redux/actions/masterAction";
import { updateVendor } from "app/services/apis/updateVendor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ListVendorTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { vendorMaster, TotalPage, loading } = useSelector(
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
      case "editStatus":
        Swal.fire({
          title: `Are you sure you want to ${
            menuItem.data.status === "active" ? "Deactivate ?" : "Activate ?"
          }`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            handleStatusChange(menuItem.data);
          }
        });
        break;
    }
  };

  const handleStatusChange = async (row) => {
    try {
      setLoader(true);
      const data = await updateVendor(
        {
          status: row.status === "active" ? "inactive" : "active",
        },
        row._id
      );
      if (data?.status === 200) {
        dispatch(getAllVendor("", "desc", "updated_at", 1));
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: "",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
    } finally {
      setLoader(false);
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
                  active={sortBy === "vendor_code"}
                  direction={sort}
                  onClick={() => handleSort("vendor_code")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white",
                    },
                  }}
                >
                  Vendor Code
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
                  active={sortBy === "vendor_name"}
                  direction={sort}
                  onClick={() => handleSort("vendor_name")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white",
                    },
                  }}
                >
                  Vendor Name
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
                Bank Details
              </TableCell>
              {permissions?.vendor_master_edit && (
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
            {vendorMaster?.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.vendor_code}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.vendor_name}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.address}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.city}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.state}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.pin_code}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.contact_person}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.phone_number}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.email}
                </TableCell>
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
                  {row.bank_details}
                </TableCell>
                {permissions?.vendor_master_edit && (
                  <TableCell sx={{ textAlign: "left" }}>
                    <JumboDdMenu
                      icon={<MoreHorizIcon />}
                      menuItems={[
                        {
                          icon: <EditIcon />,
                          title: "Edit Vendor Details",
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
