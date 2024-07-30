import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";

import Div from "@jumbo/shared/Div";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getUserLogList } from "app/services/apis/ListApi/userLogList";
import { displayDateFun } from "app/utils/constants/functions";
import UserLogModal from "./UserLogModal";

export default function UserLogTable() {
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [logList, setLogList] = useState([]);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(1);

  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  // const sortedData = logList.result?.sort((a, b) => {
  //   const aValue = a[orderBy];
  //   const bValue = b[orderBy];
  //   if (order === "desc") {
  //     return aValue < bValue ? -1 : 1;
  //   } else {
  //     return bValue < aValue ? -1 : 1;
  //   }
  // });

  useEffect(async () => {
    setLogList(await getUserLogList());
  }, []);

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    const data = await getUserLogList(newPage);

    if (data) {
      setLogList(data);
    } else {
      setLogList([{}]);
    }
  };

  const handleInfoIconClick = (rowData) => {
    setSelectedRowData(rowData);
    setInfoModalOpen(true);
  };

  return (
    <>
      <Div sx={{ mt: -4, mb: 4 }}>
        <Typography variant="h1">User Log</Typography>
      </Div>
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
                  minWidth: "100px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Employee ID
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "100px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Employee Name
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "100px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Updated User ID
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "100px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Action
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "100px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "40px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                View
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logList?.result?.map((row, i) => (
              <TableRow key={i}>
                <TableCell
                  sx={{
                    textAlign: "left",
                    pl: 2,
                  }}
                >
                  {row.user.employee_id}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {`${row.user.first_name} ${row.user.last_name}`}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    pl: 2,
                  }}
                >
                  {row.updated_user_employee_id}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    pl: 2,
                  }}
                >
                  {row.user_action}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row.user_action == "CREATE"
                    ? row.created_at == null
                      ? "N/A"
                      : displayDateFun(row.created_at)
                    : row.created_at == null
                      ? "N/A"
                      : displayDateFun(row.created_at)}
                </TableCell>

                <TableCell
                  sx={{
                    textAlign: "left",
                    maxWidth: "100px",
                    pl: 3,
                  }}
                >
                  <VisibilityIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleInfoIconClick(row)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination size="medium"
          count={logList?.totalPages || 1}
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
        <UserLogModal
          open={isInfoModalOpen}
          onClose={() => setInfoModalOpen(false)}
          rowData={selectedRowData}
        />
      </TableContainer>
    </>
  );
}
