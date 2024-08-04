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
import { displayDateFun } from "app/utils/constants/functions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ListStorageSearchTable({
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { storageSearchMaster, TotalPage } = useSelector(
    (state) => state.masterReducer
  );

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
    switch (menuItem.action) {
      case "edit":
        navigate("/master/storage-search/edit", { state: menuItem?.data });
        break;
      // Add other cases if needed
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "#7352C7",
              color: "white",
              "& .MuiTableCell-root": { py: 2 },
            }}
          >
            <TableCell sx={{ textAlign: "left" }}>
              <TableSortLabel
                active={sortBy === "sku_group"}
                direction={sort}
                onClick={() => handleSort("sku_group")}
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": { color: "white" },
                }}
              >
                SKU Group
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ textAlign: "left" }}>
              <TableSortLabel
                active={sortBy === "ssi"}
                direction={sort}
                onClick={() => handleSort("ssi")}
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": { color: "white" },
                }}
              >
                SSI
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                "&:hover": { color: "white" },
                "&.MuiTableSortLabel-root.Mui-active": { color: "white" },
              }}
            >
              Storage Sections
            </TableCell>
            <TableCell sx={{ textAlign: "left" }}>
              <TableSortLabel
                active={sortBy === "created_employee_id.first_name"}
                direction={sort}
                onClick={() => handleSort("created_employee_id.first_name")}
                sx={{
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": { color: "white" },
                }}
              >
                Created By
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                "&:hover": { color: "white" },
                "&.MuiTableSortLabel-root.Mui-active": { color: "white" },
              }}
            >
              Created Date
            </TableCell>

            {permissions?.storage_search_master_edit === true && (
              <TableCell sx={{ textAlign: "left", color: "white" }}>
                Action
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {storageSearchMaster?.map((row, i) => (
            <TableRow key={i}>
              <TableCell sx={{ textAlign: "left" }}>{row.sku_group}</TableCell>
              <TableCell sx={{ textAlign: "left" }}>{row.ssi}</TableCell>
              <TableCell sx={{ textAlign: "left" }}>
                {row.storage_sections.join(", ")}{" "}
              </TableCell>
              <TableCell sx={{ textAlign: "left" }}>
                {row.created_employee_id?.first_name}{" "}
                {row.created_employee_id?.last_name}
              </TableCell>
              <TableCell sx={{ textAlign: "left" }}>
                {displayDateFun(row.created_at)}
              </TableCell>

              {permissions?.storage_search_master_edit === true && (
                <TableCell sx={{ textAlign: "left" }}>
                  <JumboDdMenu
                    icon={<MoreHorizIcon />}
                    menuItems={[
                      {
                        icon: <EditIcon />,
                        title: "Edit Storage Search",
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
        }}
      />
    </TableContainer>
  );
}
