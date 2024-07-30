import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const UserLogModal = ({ open, onClose, rowData }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={200}>
      <DialogTitle sx={{ fontWeight: "700" }}>Logs Info</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{
              bgcolor: "#7352C7", color: "white", "& .MuiTableCell-root": {
                py: 2,
              },
            }}>
                <TableCell
                  colSpan={2}
                  sx={{
                    textAlign: "left",
                    verticalAlign: "middle",
                    color: "white",
                    letterSpacing: "1px",
                  }}
                >
                  Updated Details
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    minWidth: "10%",
                    verticalAlign: "middle",
                  }}
                >
                  &nbsp; {/* Add a non-breaking space */}
                </TableCell>
                {/* Add more header cells here */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData?.updated_user_details ? (
                Object.keys(rowData?.updated_user_details)?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography
                        sx={{
                          fontWeight: "800",
                          textAlign: "center",
                          fontSize: "1rem",
                        }}
                      >
                        Logs not Updated
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  // Render rows based on the current page and rowsPerPage
                  Object.entries(rowData?.updated_user_details).map(
                    ([key, value], i) => (
                      <TableRow key={i}>
                        <TableCell
                          sx={{
                            textAlign: "left",
                            pl: 2,
                            width: "50%",
                          }}
                        >
                          {key} {/* Display the key in the first column */}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left",
                            pl: 2,
                            width: "50%",
                          }}
                        >
                          {key === "password"
                            ? "*****"
                            : (key == "role_id" && value) ||
                              (value == true && "Active") ||
                              (value == false && "Inactive") ||
                              value}
                        </TableCell>
                      </TableRow>
                    )
                  )
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography>Logs not Updated</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserLogModal;
