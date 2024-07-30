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
export default function ListPartyTable({
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { partyMaster, TotalPage } = useSelector(
    (state) => state.masterReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        navigate("/master/party/edit", { state: menuItem?.data });
        break;
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
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
                active={sortBy === "customer_name"}
                direction={sort}
                onClick={() => handleSort("customer_name")}
                sx={{
                  //   maxWidth: "70px",
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
              }}
            >
              <TableSortLabel
                active={sortBy === "customer_place"}
                direction={sort}
                onClick={() => handleSort("customer_place")}
                sx={{
                  //   maxWidth: "70px",
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              >
                Customer Place
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
              }}
            >
              <TableSortLabel
                active={sortBy === "created_employee_id.first_name"}
                direction={sort}
                onClick={() => handleSort("created_employee_id.first_name")}
                sx={{
                  //   maxWidth: "70px",
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
                color: "white",
              }}
            >
              Created Date
            </TableCell>
            {permissions?.pallete_master_edit == true && (
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
          {partyMaster?.map((row, i) => (
            <TableRow key={i}>
              <TableCell sx={{ textAlign: "left" }}>
                {row?.customer_name}
              </TableCell>
              <TableCell sx={{ textAlign: "left" }}>
                {row?.customer_place}
              </TableCell>
              <TableCell
                sx={{ textAlign: "left", textTransform: "capitalize" }}
              >
                {row?.created_employee_id?.first_name}{" "}
                {row?.created_employee_id?.last_name}
              </TableCell>
              <TableCell sx={{ textAlign: "left" }}>
                {displayDateFun(row.created_at)}
              </TableCell>
              {permissions?.pallete_master_edit == true && (
                <TableCell sx={{ textAlign: "left" }}>
                  <JumboDdMenu
                    icon={<MoreHorizIcon />}
                    menuItems={[
                      {
                        icon: <EditIcon />,
                        title: "Edit Party Name Details",
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
        }}
      />
    </TableContainer>
  );
}
