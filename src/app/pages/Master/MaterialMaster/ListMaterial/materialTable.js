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
import { displayDateFun } from "app/utils/constants/functions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function ListMaterialTable({
  searchTerm,
  setPage,
  page,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { supplierMaster, TotalPage, loading } = useSelector(
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
        navigate("/master/material/edit", { state: menuItem.data });
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
                  // minWidth: "70px",
                  verticalAlign: "middle",
                  minWidth: "160px",
                }}
              >
                <TableSortLabel
                  active={sortBy === "warehouse_code"}
                  direction={sort}
                  onClick={() => handleSort("warehouse_code")}
                  sx={{
                    //   maxWidth: "70px",
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Warehouse Code
                </TableSortLabel>
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "left",
                  px: 1,
                  minWidth: "80px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                <TableSortLabel
                  active={sortBy === "item_type"}
                  direction={sort}
                  onClick={() => handleSort("item_type")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                    maxWidth: "180px",
                  }}
                >
                  Item Type
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  px: 1,
                  minWidth: "80px",
                  verticalAlign: "middle",
                  color: "white",
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
                    maxWidth: "180px",
                  }}
                >
                  Storage Type
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  px: 1,
                  minWidth: "80px",
                  verticalAlign: "middle",
                  color: "white",
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
                      color: "white", // Set the color for the active state
                    },
                    maxWidth: "180px",
                  }}
                >
                  Customer Code
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  px: 1,
                  verticalAlign: "middle",
                  minWidth: "200px",
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
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Vendor No
                </TableSortLabel>
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "left",
                  px: 1,
                  verticalAlign: "middle",
                  minWidth: "210px",
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
                  px: 1,
                  minWidth: "200px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                <TableSortLabel
                  active={sortBy === "sku_description"}
                  direction={sort}
                  onClick={() => handleSort("sku_description")}
                  sx={{
                    //   maxWidth: "70px",
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Material Detail
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  px: 1,
                  minWidth: "200px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                <TableSortLabel
                  active={sortBy === "sut"}
                  direction={sort}
                  onClick={() => handleSort("sut")}
                  sx={{
                    //   maxWidth: "70px",
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
                  px: 1,
                  verticalAlign: "middle",
                  minWidth: "150px",
                }}
              >
                <TableSortLabel
                  active={sortBy === "pallet_qty"}
                  direction={sort}
                  onClick={() => handleSort("pallet_qty")}
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
                  px: 1,
                  verticalAlign: "middle",
                  minWidth: "150px",
                }}
              >
                <TableSortLabel
                  active={sortBy === "sku_group"}
                  direction={sort}
                  onClick={() => handleSort("sku_group")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Sku Group
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  px: 1,
                  verticalAlign: "middle",
                  minWidth: "100px",
                }}
              >
                <TableSortLabel
                  active={sortBy === "ssi"}
                  direction={sort}
                  onClick={() => handleSort("ssi")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  SSI
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
                  active={sortBy === "sub_category"}
                  direction={sort}
                  onClick={() => handleSort("sub_category")}
                  sx={{
                    maxWidth: "50px",
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Sub Category
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
                  px: 1,
                  minWidth: "140px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Created Date
              </TableCell>
              {permissions?.material_master_edit == true && (
                <TableCell
                  sx={{
                    textAlign: "left",
                    minWidth: "80px",
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
            {supplierMaster?.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.warehouse_code}
                </TableCell>
                <TableCell
                  sx={{
                    px: 1,
                    textAlign: "left",
                    maxWidth: "230px",
                    wordWrap: "break-word",
                  }}
                >
                  {row?.item_type || "-"}
                </TableCell>

                <TableCell
                  sx={{
                    px: 1,
                    textAlign: "left",
                    maxWidth: "140px",
                    wordWrap: "break-word",
                  }}
                >
                  {row?.storage_type || "-"}
                </TableCell>
                <TableCell
                  sx={{
                    px: 1,
                    textAlign: "left",
                    maxWidth: "170px",
                    wordWrap: "break-word",
                  }}
                >
                  {row?.customer_code || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "left", px: 1 }}>
                  {row?.vendor_code}
                </TableCell>
                <TableCell sx={{ textAlign: "left", px: 1 }}>
                  {row?.sku_code}
                </TableCell>

                <TableCell
                  sx={{
                    px: 1,
                    textAlign: "left",
                    maxWidth: "180px",
                    wordWrap: "break-word",
                  }}
                >
                  {row?.sku_description || "-"}
                </TableCell>
                <TableCell
                  sx={{
                    px: 1,
                    textAlign: "left",
                    maxWidth: "180px",
                    wordWrap: "break-word",
                  }}
                >
                  {row?.sut || "-"}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    px: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {row?.pallet_qty}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "left", px: 1, textTransform: "uppercase" }}
                >
                  {row?.sku_group}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    px: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {row?.ssi || "-"}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    px: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {row?.sub_category || "-"}
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
                <TableCell sx={{ px: 1 }}>
                  {" "}
                  {displayDateFun(row.created_at)}
                </TableCell>
                {permissions?.material_master_edit == true && (
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
                          title: "Edit Supplier Details",
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
