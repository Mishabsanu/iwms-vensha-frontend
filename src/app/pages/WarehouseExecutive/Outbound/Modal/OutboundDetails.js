// import { useTheme } from "@emotion/react";
// import Div from "@jumbo/shared/Div";
// import { displayDateFun } from "app/utils/constants/functions";
// import {
//   Dialog,
//   DialogContent,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
//   Button, // Import Button
// } from "@mui/material";
// import AllApis from "app/Apis";
// import { Axios } from "index";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export const OutboundDetails = ({ open, setOpen, rowData, onSelect }) => {
//   const [selectedSku, setSelectedSku] = useState(null);
//   const [assignedTo, setAssignedTo] = useState([]);
//   const { outbound } = useSelector((state) => state.masterReducer);

//   const modifyList = outbound.filter(
//     (item) => item.customerDetails?.customer_name === rowData.customer_name
//   );

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const theme = useTheme();
//   const [personName, setPersonName] = useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(typeof value === "string" ? value.split(",") : value);
//   };

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const assignedToResponse = await Axios.get(
//           `${AllApis.dropdownList.assignedTo}`
//         );
//         setAssignedTo(assignedToResponse.data.result);
//       } catch (error) {
//         console.error("Error fetching dropdown data", error);
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="lg">
//       <DialogContent>
//         <Typography variant="h3" color="initial" fontWeight={600}>
//           Select
//         </Typography>
//         <Div>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: "#202020", color: "white" }}>
//                 <TableCell sx={{ color: "white", px: 1 }}>Date</TableCell>
//                 <TableCell sx={{ color: "white", px: 1 }}>Order NO</TableCell>
//                 <TableCell sx={{ color: "white", px: 1 }}>Order Type</TableCell>
//                 <TableCell sx={{ color: "white", px: 1 }}>SKU Code</TableCell>
//                 <TableCell sx={{ color: "white", px: 1 }}>SKU Dec</TableCell>
//                 <TableCell sx={{ color: "white", px: 1 }}>SUT</TableCell>
//                 <TableCell sx={{ color: "white", px: 1 }}>Stock Qty</TableCell>
//                 <TableCell sx={{ color: "white", px: 1 }}>
//                   Customer Name
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {modifyList?.map((item) => (
//                 <TableRow key={item._id} sx={{ bgcolor: "#EDEBEB" }}>
//                   <TableCell sx={{ px: 1 }}>{displayDateFun(item.date)}</TableCell>
//                   <TableCell sx={{ px: 1 }}>{item.order_number}</TableCell>
//                   <TableCell sx={{ px: 1 }}>{item.order_type}</TableCell>
//                   <TableCell sx={{ px: 1 }}>{item.sku_code}</TableCell>
//                   <TableCell sx={{ px: 1 }}>{item.sku_description}</TableCell>
//                   <TableCell sx={{ px: 1 }}>{item.sut}</TableCell>
//                   <TableCell sx={{ px: 1 }}>{item.stock_qty}</TableCell>
//                   <TableCell sx={{ px: 1 }}>
//                     {item?.customerDetails?.customer_name}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Assigned To Section */}
//           <Grid item xs={12} sm={4} sx={{ mt: 2 }}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-multiple-name-label">Assigned To</InputLabel>
//               <Select
//                 labelId="demo-multiple-name-label"
//                 id="demo-multiple-name"
//                 multiple
//                 value={personName}
//                 onChange={handleChange}
//                 input={<OutlinedInput label="Assigned To" />}
//                 MenuProps={MenuProps}
//               >
//                 <MenuItem value="Select">Select</MenuItem>
//                 {assignedTo.map((item) => (
//                   <MenuItem
//                     key={item._id}
//                     value={item._id}
//                     style={getStyles(item._id, personName, theme)}
//                   >
//                     {`${item.first_name} ${item.last_name}`}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Create Transfer Order Button */}
//           <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => {
//                 // Handle the transfer order creation here
//                 console.log("Create Transfer Order Clicked");
//               }}
              
//             >
//               Create Transfer Order
//             </Button>
//           </Grid>
//         </Div>
//       </DialogContent>
//     </Dialog>
//   );
// };



// import { useTheme } from "@emotion/react";
// import Div from "@jumbo/shared/Div";
// import { displayDateFun } from "app/utils/constants/functions";
// import {
//   Dialog,
//   DialogContent,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
//   Button,
//   DialogActions, // Import DialogActions
// } from "@mui/material";
// import AllApis from "app/Apis";
// import { Axios } from "index";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export const OutboundDetails = ({ open, setOpen, rowData, onSelect }) => {
//   const [selectedSku, setSelectedSku] = useState(null);
//   const [assignedTo, setAssignedTo] = useState([]);
//   const { outbound } = useSelector((state) => state.masterReducer);

//   const [forkliftDialogOpen, setForkliftDialogOpen] = useState(false); // State for Forklift dialog

//   const modifyList = outbound.filter(
//     (item) => item.customerDetails?.customer_name === rowData.customer_name
//   );

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const theme = useTheme();
//   const [personName, setPersonName] = useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(typeof value === "string" ? value.split(",") : value);
//   };

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const assignedToResponse = await Axios.get(
//           `${AllApis.dropdownList.assignedTo}`
//         );
//         setAssignedTo(assignedToResponse.data.result);
//       } catch (error) {
//         console.error("Error fetching dropdown data", error);
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   const handleForkliftOpen = () => {
//     setForkliftDialogOpen(true);
//   };

//   const handleForkliftClose = () => {
//     setForkliftDialogOpen(false);
//   };

//   const handleForkliftSubmit = () => {
//     // Handle the submit action here
//     console.log("Forklift Assigned To:", personName);
//     handleForkliftClose();
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={handleClose} maxWidth="lg">
//         <DialogContent>
//           <Typography variant="h3" color="initial" fontWeight={600}>
//             Select
//           </Typography>
//           <Div>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: "#202020", color: "white" }}>
//                   <TableCell sx={{ color: "white", px: 1 }}>Date</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>Order NO</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>Order Type</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>SKU Code</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>SKU Dec</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>SUT</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>Stock Qty</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>
//                     Customer Name
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {modifyList?.map((item) => (
//                   <TableRow key={item._id} sx={{ bgcolor: "#EDEBEB" }}>
//                     <TableCell sx={{ px: 1 }}>{displayDateFun(item.date)}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.order_number}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.order_type}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.sku_code}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.sku_description}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.sut}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.stock_qty}</TableCell>
//                     <TableCell sx={{ px: 1 }}>
//                       {item?.customerDetails?.customer_name}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//             {/* Create Transfer Order and Additional Buttons */}
//             <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
//             <Grid item>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleForkliftOpen} // Open Forklift dialog
//                 >
//                   Forklift
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={() => {
//                     console.log("Dock Clicked");
//                   }}
//                 >
//                   Dock
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => {
//                     console.log("Create Transfer Order Clicked");
//                   }}
//                 >
//                   Create Transfer Order
//                 </Button>
//               </Grid>
              
//             </Grid>
//           </Div>
//         </DialogContent>
//       </Dialog>

//       {/* Forklift Dialog */}
//       <Dialog open={forkliftDialogOpen} onClose={handleForkliftClose} maxWidth="sm">
//         <DialogContent>
//           <Typography variant="h4" color="initial" fontWeight={600}>
//             Forklift Assignment
//           </Typography>
//           <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
//             <FormControl fullWidth>
//               <InputLabel id="forklift-assigned-to-label">Assigned To</InputLabel>
//               <Select
//                 labelId="forklift-assigned-to-label"
//                 id="forklift-assigned-to"
//                 multiple
//                 value={personName}
//                 onChange={handleChange}
//                 input={<OutlinedInput label="Assigned To" />}
//                 MenuProps={MenuProps}
//               >
//                 <MenuItem value="Select">Select</MenuItem>
//                 {assignedTo.map((item) => (
//                   <MenuItem
//                     key={item._id}
//                     value={item._id}
//                     style={getStyles(item._id, personName, theme)}
//                   >
//                     {`${item.first_name} ${item.last_name}`}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleForkliftSubmit} // Handle submit action
//           >
//             Submit
//           </Button>
//           <Button onClick={handleForkliftClose} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };






// import { useTheme } from "@emotion/react";
// import Div from "@jumbo/shared/Div";
// import { displayDateFun } from "app/utils/constants/functions";
// import {
//   Dialog,
//   DialogContent,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
//   Button,
//   DialogActions, // Import DialogActions
// } from "@mui/material";
// import AllApis from "app/Apis";
// import { Axios } from "index";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export const OutboundDetails = ({ open, setOpen, rowData, onSelect }) => {
//   const [selectedSku, setSelectedSku] = useState(null);
//   const [assignedTo, setAssignedTo] = useState([]);
//   const { outbound } = useSelector((state) => state.masterReducer);

//   const [forkliftDialogOpen, setForkliftDialogOpen] = useState(false); // State for Forklift dialog
//   const [transferOrderDialogOpen, setTransferOrderDialogOpen] = useState(false); // State for Transfer Order dialog

//   const modifyList = outbound.filter(
//     (item) => item.customerDetails?.customer_name === rowData.customer_name
//   );

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const theme = useTheme();
//   const [personName, setPersonName] = useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(typeof value === "string" ? value.split(",") : value);
//   };

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const assignedToResponse = await Axios.get(
//           `${AllApis.dropdownList.assignedTo}`
//         );
//         setAssignedTo(assignedToResponse.data.result);
//       } catch (error) {
//         console.error("Error fetching dropdown data", error);
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   const handleForkliftOpen = () => {
//     setForkliftDialogOpen(true);
//   };

//   const handleForkliftClose = () => {
//     setForkliftDialogOpen(false);
//   };

//   const handleForkliftSubmit = () => {
//     // Handle the submit action here
//     console.log("Forklift Assigned To:", personName);
//     handleForkliftClose();
//   };

//   const handleTransferOrderOpen = () => {
//     setTransferOrderDialogOpen(true);
//   };

//   const handleTransferOrderClose = () => {
//     setTransferOrderDialogOpen(false);
//   };

//   const handleTransferOrderSelection = (option) => {
//     console.log(`Selected Transfer Order Option: ${option}`);
//     // Handle the selection logic here
//     handleTransferOrderClose();
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={handleClose} maxWidth="lg">
//         <DialogContent>
//           <Typography variant="h3" color="initial" fontWeight={600}>
//             Select
//           </Typography>
//           <Div>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: "#202020", color: "white" }}>
//                   <TableCell sx={{ color: "white", px: 1 }}>Date</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>Order NO</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>Order Type</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>SKU Code</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>SKU Dec</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>SUT</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>Stock Qty</TableCell>
//                   <TableCell sx={{ color: "white", px: 1 }}>
//                     Customer Name
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {modifyList?.map((item) => (
//                   <TableRow key={item._id} sx={{ bgcolor: "#EDEBEB" }}>
//                     <TableCell sx={{ px: 1 }}>{displayDateFun(item.date)}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.order_number}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.order_type}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.sku_code}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.sku_description}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.sut}</TableCell>
//                     <TableCell sx={{ px: 1 }}>{item.stock_qty}</TableCell>
//                     <TableCell sx={{ px: 1 }}>
//                       {item?.customerDetails?.customer_name}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//             {/* Create Transfer Order and Additional Buttons */}
//             <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
//               <Grid item>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleTransferOrderOpen} // Open Transfer Order dialog
//                 >
//                   Create Transfer Order
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleForkliftOpen} // Open Forklift dialog
//                 >
//                   Forklift
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={() => {
//                     console.log("Dock Clicked");
//                   }}
//                 >
//                   Dock
//                 </Button>
//               </Grid>
//             </Grid>
//           </Div>
//         </DialogContent>
//       </Dialog>

//       {/* Forklift Dialog */}
//       <Dialog open={forkliftDialogOpen} onClose={handleForkliftClose} maxWidth="sm">
//         <DialogContent>
//           <Typography variant="h4" color="initial" fontWeight={600}>
//             Forklift Assignment
//           </Typography>
//           <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
//             <FormControl fullWidth>
//               <InputLabel id="forklift-assigned-to-label">Assigned To</InputLabel>
//               <Select
//                 labelId="forklift-assigned-to-label"
//                 id="forklift-assigned-to"
//                 multiple
//                 value={personName}
//                 onChange={handleChange}
//                 input={<OutlinedInput label="Assigned To" />}
//                 MenuProps={MenuProps}
//               >
//                 <MenuItem value="Select">Select</MenuItem>
//                 {assignedTo.map((item) => (
//                   <MenuItem
//                     key={item._id}
//                     value={item._id}
//                     style={getStyles(item._id, personName, theme)}
//                   >
//                     {`${item.first_name} ${item.last_name}`}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleForkliftSubmit} // Handle submit action
//           >
//             Submit
//           </Button>
//           <Button onClick={handleForkliftClose} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Transfer Order Dialog */}
//       <Dialog open={transferOrderDialogOpen} onClose={handleTransferOrderClose} maxWidth="sm">
//         <DialogContent>
//           <Typography variant="h4" color="initial" fontWeight={600}>
//             Choose Transfer Order Type
//           </Typography>
//           <Grid container spacing={2} sx={{ mt: 2 }}>
//           <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 fullWidth
//                 onClick={() => handleTransferOrderSelection("Cross Dock")}
//               >
//                 Cross Dock  Pickup
//               </Button>
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 onClick={() => handleTransferOrderSelection("Manual")}
//               >
//                 Manual
//               </Button>
//             </Grid>
           
           
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleTransferOrderClose} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };




import { useTheme } from "@emotion/react";
import Div from "@jumbo/shared/Div";
import { displayDateFun } from "app/utils/constants/functions";
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
  Button,
  DialogActions,
  IconButton,
  DialogTitle
} from "@mui/material";
import AllApis from "app/Apis";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DockModal } from "./DockModal";
import { sendToCrossDock } from "app/services/apis/sendToCrossDock";
import { sendToForklift } from "app/services/apis/sendToForklift";
import { sendToDock } from "app/services/apis/sendToDock";
import CloseIcon from '@mui/icons-material/Close';

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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [forkliftDialogOpen, setForkliftDialogOpen] = useState(false);
  const [transferOrderDialogOpen, setTransferOrderDialogOpen] = useState(false);
  const [dockDialogOpen, setDockDialogOpen] = useState(false); // New state for dock dialog
  const [apiData, setApiData] = useState(null); // State to store API data
  const [dockValue, setDockValue] = useState(""); // New state for dock value
  const [forkliftValue, setForkliftValue] = useState(""); // New state for forklift value

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

  const handleForkliftOpen = () => {
    setForkliftDialogOpen(true);
  };

  const handleForkliftClose = () => {
    setForkliftDialogOpen(false);
  };

  const handleForkliftSave = async () => {
    if (forkliftValue) {
      try {
        await sendToForklift({ forklift: forkliftValue, assigned_to: personName });
        console.log(`Selected Forklift Value: ${forkliftValue}`);
        handleForkliftClose();
        handleTransferOrderClose()
        handleDockClose()
      } catch (error) {
        console.error("Error sending Forklift data", error);
      }
    }
  };

  const handleTransferOrderOpen = () => {
    setTransferOrderDialogOpen(true);
  };

  const handleTransferOrderClose = () => {
    setTransferOrderDialogOpen(false);
  };



  const handleTransferOrderSelection = async (option) => {
   
      try {
        const data = {
          modifyList: modifyList, // Include the entire modifyList

          assigned_to: personName.length ? personName : ["default_assigned"],
          dock: dockValue || "default_dock",
          forklift: forkliftValue || "default_forklift",
          customerDetails: rowData?.customer_name,
          orderType: option,
          // Add any other data needed
        };
  
        const response = await sendToCrossDock(data);
  
        console.log("Cross Dock data sent:", data);
  
        // Close the dialogs
        handleForkliftClose();
        handleTransferOrderClose();
        handleDockClose();
  
      } catch (error) {
        console.error("Error sending Cross Dock Pickup data", error);
      }
    
    console.log(`Selected Transfer Order Option: ${option}`);
    handleTransferOrderClose();
  };
  



  const handleDockOpen = () => {
    setDockDialogOpen(true);
  };

  const handleDockClose = () => {
    setDockDialogOpen(false);
  };

  const handleDockSave = async () => {
    try {
      // Assuming sendToDock is an API call or some other operation
       await sendToDock(dockValue); 
  
      // Log to check if the function is being reached
      console.log("Dock value saved, closing dialog...");
  
      // Ensure the dialog is closed
      handleDockClose();
    } catch (error) {
      console.error("Error saving dock data", error);
    }
  };
  

  return (
    <>
     <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle>
        <Typography variant="h3" color="initial" fontWeight={600}>
          Select
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
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
              <TableCell sx={{ color: "white", px: 1 }}>Customer Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modifyList?.map((item) => (
              <TableRow key={item._id} sx={{ bgcolor: "#EDEBEB" }}>
                <TableCell sx={{ px: 1 }}>
                  {displayDateFun(item.date)}
                </TableCell>
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

        <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleForkliftOpen}
            >
              Forklift
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDockOpen} // Update to open dock dialog
            >
              Dock
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTransferOrderOpen}
            >
              Create Transfer Order
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>

      <Dialog
        open={forkliftDialogOpen}
        onClose={handleForkliftClose}
        maxWidth="sm"
      >
        <DialogContent>
          <Typography variant="h4" color="initial" fontWeight={600}>
            Forklift Assignment
          </Typography>
          <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="forklift-select-label">Select Forklift</InputLabel>
              <Select
                labelId="forklift-select-label"
                id="forklift-select"
                value={forkliftValue}
                onChange={(e) => setForkliftValue(e.target.value)}
                input={<OutlinedInput label="Select Forklift" />}
                MenuProps={MenuProps}
              >
                <MenuItem value="">Select</MenuItem>
                {/* Replace with actual forklift data */}
                <MenuItem value="Forklift1">Forklift1</MenuItem>
                <MenuItem value="Forklift2">Forklift2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleForkliftSave}
          >
            Save
          </Button>
          <Button onClick={handleForkliftClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={transferOrderDialogOpen}
        onClose={handleTransferOrderClose}
        maxWidth="sm"
      >
        <DialogContent>
          <Typography variant="h4" color="initial" fontWeight={600}>
            Transfer Order Type
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => handleTransferOrderSelection("Cross Dock")}
              >
                Cross Dock Pickup
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleTransferOrderSelection("Transfer Order")}
              >
                Manual
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleTransferOrderSelection("Transfer Order")}
              >
                Syatem
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTransferOrderClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dockDialogOpen} onClose={handleDockClose} maxWidth="sm">
  <DialogContent>
    <Typography variant="h4" color="initial" fontWeight={600}>
      Dock Selection
    </Typography>
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id="dock-select-label">Dock</InputLabel>
      <Select
        labelId="dock-select-label"
        id="dock-select"
        value={dockValue}
        onChange={(e) => setDockValue(e.target.value)}
        input={<OutlinedInput label="Dock" />}
        MenuProps={MenuProps}
      >
        <MenuItem value="Cross Dock">Cross Dock</MenuItem>
      </Select>
    </FormControl>
  </DialogContent>
  <DialogActions>
    <Button variant="contained" color="primary" onClick={handleDockSave}>
      Save
    </Button>
    <Button onClick={handleDockClose} color="secondary">
      Cancel
    </Button>
  </DialogActions>
</Dialog>

    </>
  );
};
