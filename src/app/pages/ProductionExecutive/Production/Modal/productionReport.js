import Div from "@jumbo/shared/Div";
import {
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import { displayDateFun } from "app/utils/constants/functions";

export const ProductionReport = ({ open, setOpen, rowData }) => {
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      maxWidth="xl"
      PaperProps={{
        style: {
          height: '100vh',
          margin: 0,
          padding: theme.spacing(2),
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            mb: 2,
            width: '100%',
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: theme.spacing(1),
              top: theme.spacing(1),
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="initial"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            Production Report
          </Typography>
        </Box>
        <Box sx={{ overflowX: "auto", width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#202020", color: "white" }}>
                <TableCell sx={{ color: "white", px: 1 }}>Line No</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Process Order Qty
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Process Order
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SKU Code</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  SKU Description
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SUT</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Transfer Order
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Pallet Qty.
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>Bin</TableCell>

                <TableCell sx={{ color: "white", px: 1 }}>
                  Assigned To
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Last Pallet Status
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Overflow Status
                </TableCell>

                <TableCell sx={{ color: "white", px: 1 }}>Batch</TableCell>

                <TableCell sx={{ color: "white", px: 1 }}>Date</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Confirm Date
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Digit 3 Codes
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Transaction Type
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>Status</TableCell>

                <TableCell sx={{ color: "white", px: 1 }}>
                  Created Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData?.map((item) => (
                <TableRow key={item.sku_code} sx={{ bgcolor: "#EDEBEB" }}>
                  <TableCell sx={{ px: 1 }}>
                    {item.production_line_details?.production_line_name || "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item.process_order_qty || "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item.process_order || "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item.sku_code || "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item.sku_description || "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>{item.sut || "N/A"}</TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item.transfer_order || "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item.pallet_qty || "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>{item.bin || "N/A"}</TableCell>

                  <TableCell sx={{ px: 1 }}>
                    {item.assigned_user?.first_name || "N/A"}{" "}
                    {item.assigned_user?.last_name || "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item.last_pallate_status ? "Yes" : "No"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item.over_flow_status ? "Yes" : "No"}
                  </TableCell>

                  <TableCell sx={{ px: 1 }}>{item.batch || "N/A"}</TableCell>

                  <TableCell sx={{ px: 1 }}>
                    {item.date ? displayDateFun(item.date) : "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item.confirm_date
                      ? displayDateFun(item.confirm_date)
                      : "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item.digit_3_codes || "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item.transaction_type || "N/A"}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>{item.status || "N/A"}</TableCell>

                  <TableCell sx={{ px: 1 }}>
                    {item.created_at
                      ? displayDateFun(item.created_at)
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
