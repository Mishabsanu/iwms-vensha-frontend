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
import { getAllUnit } from "app/redux/actions/masterAction";
import { updateBin } from "app/services/apis/updateBin";
import { displayDateFun } from "app/utils/constants/functions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ListTransferOrderTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { unitMaster, TotalPage, loading } = useSelector(
    (state) => state.masterReducer
  );
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        navigate("/master/item-code/edit", { state: menuItem?.data });
        break;
      case "editStatus":
        Swal.fire({
          title: `Are you sure you want to ${
            menuItem.data.status == "active" ? "Deactivate ?" : "Activate ?"
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
      const data = await updateBin(
        {
          status: row.status == "active" ? "inactive" : "active",
        },
        row._id
      );
      if (data?.status == 200) {
        dispatch(getAllUnit("", "desc", "updated_at", 1));
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
                  minWidth: "180px",
                  verticalAlign: "middle",
                  color: "white",
                  px: 1,
                }}
              >
                LR Number
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
                  minWidth: "80px",
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
                  minWidth: "80px",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "from_vendor"}
                  direction={sort}
                  onClick={() => handleSort("from_vendor")}
                  sx={{
                    maxWidth: "50px",
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  {" "}
                  From Vendor
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  px: 1,
                  minWidth: "80px",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "truck_type"}
                  direction={sort}
                  onClick={() => handleSort("truck_type")}
                  sx={{
                    maxWidth: "50px",
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Customer Name
                </TableSortLabel>
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "left",
                  color: "white",
                }}
              >
                P.O Number
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "white",
                }}
              >
                Invoice Number
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "white",
                }}
              >
                Invoice Qty
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "white",
                }}
              >
                Invoice Value
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "white",
                }}
              >
                EWay Bill Number
              </TableCell>
              {permissions?.grade_master_edit == true && (
                <TableCell
                  sx={{
                    textAlign: "left",
                    color: "white",
                  }}
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {unitMaster?.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ textAlign: "left" }}>
                  {displayDateFun(row.date)}
                </TableCell>
                <TableCell sx={{ textAlign: "left", px: 1 }}>
                  {row?.lr_number ? row?.lr_number : "-"}
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
                  {row?.from_vendor}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.customer_name}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.po_number}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.invoice_number}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.invoice_qty}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.invoice_value}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.eway_bill_number}
                </TableCell>
                {permissions?.item_code_master_edit == true && (
                  <TableCell sx={{ textAlign: "left" }}>
                    <JumboDdMenu
                      icon={<MoreHorizIcon />}
                      menuItems={[
                        {
                          icon: <EditIcon />,
                          title: "Edit Item Type Details",
                          action: "edit",
                          data: row,
                        },
                        {
                          icon: <AutorenewIcon />,
                          title: `${
                            row?.status == "active" ? "Deactivate" : "Activate"
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
