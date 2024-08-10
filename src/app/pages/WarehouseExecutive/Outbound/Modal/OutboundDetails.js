import { useTheme } from "@emotion/react";
import Div from "@jumbo/shared/Div";
import {
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button, // Import Button
} from "@mui/material";
import AllApis from "app/Apis";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const OutboundDetails = ({ open, setOpen, rowData, onSelect }) => {
  const [selectedSku, setSelectedSku] = useState(null);
  const [assignedTo, setAssignedTo] = useState([]);
  const { outbound } = useSelector((state) => state.masterReducer);

  const modifyList = outbound.filter(
    (item) => item.customerDetails?.customer_name === rowData.customer_name
  );

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const assignedToResponse = await Axios.get(
          `${AllApis.dropdownList.assignedTo}`
        );
        setAssignedTo(assignedToResponse.data.result);
      } catch (error) {
        console.error("Error fetching dropdown data", error);
      }
    };

    fetchDropdownData();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogContent>
        <Typography variant="h3" color="initial" fontWeight={600}>
          Select
        </Typography>
        <Div>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#202020", color: "white" }}>
                <TableCell sx={{ color: "white", px: 1 }}>Date</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>Order NO</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>Order Type</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SKU Code</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SKU Dec</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SUT</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>Stock Qty</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Customer Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modifyList?.map((item) => (
                <TableRow key={item._id} sx={{ bgcolor: "#EDEBEB" }}>
                  <TableCell sx={{ px: 1 }}>{item.date}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.order_number}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.order_type}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.sku_code}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.sku_description}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.sut}</TableCell>
                  <TableCell sx={{ px: 1 }}>{item.stock_qty}</TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {item?.customerDetails?.customer_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Assigned To Section */}
          <Grid item xs={12} sm={4} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-name-label">Assigned To</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Assigned To" />}
                MenuProps={MenuProps}
              >
                <MenuItem value="Select">Select</MenuItem>
                {assignedTo.map((item) => (
                  <MenuItem
                    key={item._id}
                    value={item._id}
                    style={getStyles(item._id, personName, theme)}
                  >
                    {`${item.first_name} ${item.last_name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Create Transfer Order Button */}
          <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // Handle the transfer order creation here
                console.log("Create Transfer Order Clicked");
              }}
              
            >
              Create Transfer Order
            </Button>
          </Grid>
        </Div>
      </DialogContent>
    </Dialog>
  );
};
