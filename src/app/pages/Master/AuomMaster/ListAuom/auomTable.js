import JumboDdMenu from "@jumbo/components/JumboDdMenu/JumboDdMenu";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Accordion,
  AccordionSummary,
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

export default function ListAuomTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { auomMaster, TotalPage, loading } = useSelector(
    (state) => state.masterReducer
  );
  const [loader, setLoader] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  const handleSort = (property) => {
    setSort(sort === "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

  const handleItemAction = (menuItem) => {
    if (menuItem.action === "edit") {
      navigate("/master/auom/edit", { state: menuItem?.data });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
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
              <TableCell sx={{ textAlign: "left" }}>
                <TableSortLabel
                  active={sortBy === "sku_code"}
                  direction={sort}
                  onClick={() => handleSort("sku_code")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white",
                    },
                  }}
                >
                  SKU Code
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
                  minWidth: "180px",
                  verticalAlign: "middle",
                  color: "white",
                  px: 1,
                }}
              >
                Created By
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
                      color: "white",
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
                Created Date
              </TableCell>

              {permissions?.auom_master_edit && (
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
            {auomMaster?.map((row, i) => (
              <>
                <TableRow
                  onClick={() => handleRowClick(row._id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell sx={{ textAlign: "left" }}>
                    {row?.sku_code}
                  </TableCell>

                  <TableCell sx={{ textAlign: "left", px: 1 }}>
                    {row?.remarks || "-"}
                  </TableCell>

                  <TableCell
                    sx={{ textAlign: "left", textTransform: "capitalize" }}
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
                  <TableCell sx={{ textAlign: "left" }}>
                    {displayDateFun(row.created_at)}
                  </TableCell>
                  {permissions?.auom_master_edit && (
                    <TableCell sx={{ textAlign: "left" }}>
                      <JumboDdMenu
                        icon={<MoreHorizIcon />}
                        menuItems={[
                          {
                            icon: <EditIcon />,
                            title: "Edit AUOM Details",
                            action: "edit",
                            data: row,
                          },
                        ]}
                        onClickCallback={handleItemAction}
                      />
                    </TableCell>
                  )}
                </TableRow>
                {expandedRow === row._id && (
                  <TableRow>
                    <TableCell
                      colSpan={permissions?.auom_master_edit ? 7 : 6}
                    >
                      <Accordion
                        expanded={expandedRow === row._id}
                        sx={{ boxShadow: "none" }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel-${i}-content`}
                          id={`panel-${i}-header`}
                        >
                          <Table sx={{ width: "100%" }} size="small">
                            <TableHead>
                              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                                <TableCell
                                  sx={{
                                    textAlign: "left",
                                    minWidth: "180px",
                                    verticalAlign: "middle",
                                    color: "black",
                                    px: 1,
                                  }}
                                >
                                  Base UOM
                                </TableCell>
                                <TableCell
                                  sx={{
                                    textAlign: "left",
                                    minWidth: "180px",
                                    verticalAlign: "middle",
                                    color: "black",
                                    px: 1,
                                  }}
                                >
                                  Convention UOM
                                </TableCell>
                                <TableCell
                                  sx={{
                                    textAlign: "left",
                                    minWidth: "180px",
                                    verticalAlign: "middle",
                                    color: "black",
                                    px: 1,
                                  }}
                                >
                                  Unit
                                </TableCell>
                                <TableCell
                                  sx={{
                                    textAlign: "left",
                                    minWidth: "180px",
                                    verticalAlign: "middle",
                                    color: "black",
                                    px: 1,
                                  }}
                                >
                                  AUOM
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.uom_details?.map((item, i) => (
                                <TableRow key={i}>
                                  <TableCell sx={{ textAlign: "left" }}>
                                    {item?.base_uom}
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "left" }}>
                                    {item?.convention_uom}
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "left" }}>
                                    {item?.unit}
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "left" }}>
                                    {item?.auom}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </AccordionSummary>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </>
  );
}
