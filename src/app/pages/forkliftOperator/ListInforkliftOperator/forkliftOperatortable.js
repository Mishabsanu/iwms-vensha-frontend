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
  Card,
  CardContent,
  CardHeader,
  Select,
  MenuItem,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "app/components/ListingPageLoader";
import { displayDateFun } from "app/utils/constants/functions";
import Swal from "sweetalert2";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ListForkliftOperatortTable({
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
  const { forkliftOperator, TotalPage, loading } = useSelector(
    (state) => state.masterReducer
  );
  console.log(forkliftOperator, "forkliftOperatort");
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );
  const [isLoading, setIsLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [pinCode, setPinCode] = useState("");

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

  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handlePinChange = (e) => {
    setPinCode(e.target.value);
  };

  const handleSubmit = () => {
    // Call API to complete task and update state
    setCompletedTasks([...completedTasks, selectedTask]);
    setPendingTasks(pendingTasks.filter((task) => task !== selectedTask));
    setOpenModal(false);
    setPinCode("");
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <Card>
        <CardHeader title="Forklift Operator Tasks" />
        <CardContent>
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
                          color: "white",
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
                </TableRow>
              </TableHead>
              <TableBody>
                {forkliftOperator?.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ textAlign: "left" }}>
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
                    <TableCell sx={{ textAlign: "left" }}>
                      {row.sku_code}
                    </TableCell>
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
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell>Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingTasks.map((task, i) => (
                  <TableRow key={i}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>
                      <Select value="" onChange={() => handleSelectTask(task)}>
                        <MenuItem value="select">Select</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Completed Tasks</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {completedTasks.map((task, i) => (
                  <TableRow key={i}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          handleItemAction({ action: "edit", data: task })
                        }
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <h2>Task Details</h2>
          <p>{selectedTask?.name}</p>
          <TextField
            label="PIN Code"
            value={pinCode}
            onChange={handlePinChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
