import JumboDdMenu from "@jumbo/components/JumboDdMenu/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import AllApis from "app/Apis";
import FullScreenLoader from "app/components/ListingPageLoader";
import { getAllProduction } from "app/redux/actions/masterAction";
import { displayDateFun } from "app/utils/constants/functions";
import { Axios } from "index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DockEntry } from "../Modal/dockEntry";
export default function ListProductionTable({
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
  const { production, TotalPage, loading } = useSelector(
    (state) => state.masterReducer
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );
  const [addGroup, setAddGroup] = useState([]);

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

  const handleCheckbox = (e, row) => {
    if (e.target.checked == true) {
      const selectedArr = [...addGroup];
      // const data = {
      //   _id: row._id,
      // };

      selectedArr.push(row);

      setAddGroup(selectedArr);
    } else {
      const selectedArr = [...addGroup];
      const deletedIds = selectedArr.filter((ele) => ele._id != row?._id);

      setAddGroup(deletedIds);
    }
  };

  const handleAddBinAllocate = async () => {
    try {
      setIsLoading(true);

      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      const res = await Axios.post(
        AllApis.allocateBin,
        { item_details: addGroup },
        config
      );

      if (res?.data.status) {
        Swal.fire({ icon: "success", title: "Allocat successfully" });
        dispatch(getAllProduction(searchTerm, sort, sortBy, page));
        setAddGroup([]);
        navigate("/dashboard/warehouseexecutive/production");
      } else {
        Swal.fire({
          icon: "error",
          title: res.data.message || "Unknown error occurred",
        });
      }
    } catch (error) {
      console.log(error, "error");
      Swal.fire({
        title: error.response ? error.response.data.message : error.message,
        icon: "error",

        showConfirmButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCrossDocker = async () => {
    setIsModalOpen(true);
  };
  return (
    <>
      {loading && <FullScreenLoader />}

      {addGroup?.length > 0 &&
        permissions?.production_master_create == true && (
          <Div
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              bgcolor: "#7352C7",
              p: 2,
              borderRadius: "5px",
            }}
          >
            <Typography variant="h5" sx={{ color: "white", mt: 1 }}>
              {addGroup?.length} Item Selected
            </Typography>
            <Div sx={{ display: "flex", columnGap: 3 }}>
              <LoadingButton
                variant="contained"
                color="success"
                onClick={() => handleAddBinAllocate()}
              >
                Send To Bin Allocat
              </LoadingButton>
              <LoadingButton
                variant="contained"
                color="success"
                onClick={() => handleAddCrossDocker()}
              >
                Send To Cross Dock
              </LoadingButton>
            </Div>
          </Div>
        )}
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
              {permissions?.production_master_create == true && (
                <TableCell
                  sx={{
                    textAlign: "left",
                    minWidth: "50px",
                    verticalAlign: "middle",
                    px: 1,
                    color: "white",
                  }}
                >
                  <Checkbox
                    onClick={(event) => {
                      if (event?.target?.checked) {
                        // Select all non-Allocated items
                        const nonAllocatedIds = production?.filter(
                          (ele) =>
                            ele.status !== "Allocated" ||
                            ele.status !== "verified"
                        );

                        const newItems = nonAllocatedIds.filter(
                          (newItem) =>
                            !addGroup.some(
                              (existingItem) => existingItem._id === newItem._id
                            )
                        );
                        setAddGroup([...addGroup, ...newItems]);
                      } else {
                        // Deselect all non-Allocated items
                        setAddGroup(
                          addGroup.filter(
                            (item) =>
                              !production.some(
                                (packItem) =>
                                  (packItem._id === item._id &&
                                    packItem.status !== "Allocated") ||
                                  packItem.status !== "verified"
                              )
                          )
                        );
                      }
                    }}
                    color="primary"
                    checked={
                      addGroup?.length > 0 &&
                      production
                        ?.filter(
                          (item) =>
                            item.status !== "Allocated" ||
                            item.status !== "verified"
                        )
                        ?.map((item) => item._id)
                        ?.every((id) =>
                          addGroup?.some((groupItem) => groupItem._id === id)
                        )
                    }
                    sx={{
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                  />
                </TableCell>
              )}
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
                  active={sortBy === "Production_Line"}
                  direction={sort}
                  onClick={() => handleSort("Production_Line")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Production Line
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
                  Process Order
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
                  active={sortBy === "process_order_qty"}
                  direction={sort}
                  onClick={() => handleSort("process_order_qty")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Process Order
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
                  color: "white",
                  minWidth: "120px",
                }}
              >
                UOM
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
                  Transfer Order
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
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "Three_Digit_Codes"}
                  direction={sort}
                  onClick={() => handleSort("Three_Digit_Codes")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  3 Digit Codes
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
            </TableRow>
          </TableHead>
          <TableBody>
            {production?.map((row, i) => (
              <TableRow key={i}>
                {permissions?.production_master_create && (
                  <TableCell sx={{ textAlign: "left", px: 1 }}>
                    <Checkbox
                      disabled={
                        row.status === "Allocated" || row.status === "verified"
                      }
                      onClick={(event) => handleCheckbox(event, row)}
                      color="primary"
                      checked={addGroup?.some((ele) => ele._id == row._id)}
                    />
                  </TableCell>
                )}
                <TableCell
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {displayDateFun(row.date)}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {row.production_line_details.production_line_name}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.process_order_qty}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.process_order}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row.sku_code}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.sku_description}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row?.sut || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row?.uom}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.transfer_order}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.pallet_qty || "-"}
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
                  {row?.digit_3_codes || "-"}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row?.status || "-"}
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
                      permissions.production_master_edit == true
                        ? [
                            {
                              icon: <EditIcon />,
                              title: "Edit Production Details",
                              action: "edit",
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
          {isModalOpen && (
            <DockEntry
              searchTerm={searchTerm}
              page={page}
              setPage={setPage}
              sort={sort}
              sortBy={sortBy}
              setSort={setSort}
              setSortBy={setSortBy}
              open={isModalOpen}
              setOpen={setIsModalOpen}
              rowData={addGroup}
              setAddGroup={setAddGroup}
            />
          )}
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
