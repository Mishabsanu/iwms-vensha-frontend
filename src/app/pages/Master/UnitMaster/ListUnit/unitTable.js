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
import { updateUnit } from "app/services/apis/updateUnit";
import { displayDateFun } from "app/utils/constants/functions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ListUnitTable({
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
        navigate("/master/unit/edit", { state: menuItem?.data });
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
      const data = await updateUnit(
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
            <TableRow sx={{
              bgcolor: "#7352C7", color: "white", "& .MuiTableCell-root": {
                py: 2,
              },
            }}>
              <TableCell
                sx={{
                  textAlign: "left",
                }}
              >
                <TableSortLabel
                  active={sortBy === "unit_name"}
                  direction={sort}
                  onClick={() => handleSort("unit_name")}
                  sx={{
                    //   maxWidth: "70px",
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Unit Name
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
                  minWidth: "80px",
                  verticalAlign: "middle",
                  color: "white",
                  px: 1,
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
                  px: 1,
                  minWidth: "80px",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "status"}
                  direction={sort}
                  onClick={() => handleSort("status")}
                  sx={{
                    maxWidth: "50px",
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
                  color: "white",
                  px: 1,
                }}
              >
                Created Date
              </TableCell>
              {permissions?.unit_master_edit == true && (
                <TableCell
                  sx={{
                    textAlign: "left",
                    color: "white",
                    px: 1,
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
                  {row.unit_name}
                </TableCell>
                <TableCell sx={{ textAlign: "left", px: 1 }}>
                  {row?.unit_remarks ? row?.unit_remarks : "-"}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "left", textTransform: "capitalize", px: 1 }}
                >
                  {row?.created_employee_id?.first_name}{" "}
                  {row?.created_employee_id?.last_name}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    px: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {row?.status}
                </TableCell>
                <TableCell sx={{ textAlign: "left", px: 1 }}>
                  {displayDateFun(row.created_at)}
                </TableCell>
                {permissions?.unit_master_edit == true && (
                  <TableCell sx={{ textAlign: "left", px: 1 }}>
                    <JumboDdMenu
                      icon={<MoreHorizIcon />}
                      menuItems={[
                        {
                          icon: <EditIcon />,
                          title: "Edit Unit Details",
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
