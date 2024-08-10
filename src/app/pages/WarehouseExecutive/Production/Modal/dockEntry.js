// import Div from "@jumbo/shared/Div";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogContent,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   MenuItem,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import AllApis from "app/Apis";
// import { getAllProduction } from "app/redux/actions/masterAction";
// import { Axios } from "index";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// export const DockEntry = ({ open, setOpen, rowData }) => {
//   console.log(rowData, "rowData");

//   // Store the selected option for each item
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [crossDock, setCrossDock] = useState([]);
//   const [errors, setErrors] = useState({});
//   const dispatch = useDispatch();
//   const handleClose = () => {
//     setOpen(false); // Use setOpen to close the modal
//   };

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const crossDockResponse = await Axios.get(
//           `${AllApis.dropdownList.crossDockerList}`
//         );
//         setCrossDock(crossDockResponse.data.result);
//       } catch (error) {
//         console.error("Error fetching dropdown data", error);
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   // Create a mapping of dock ID to dock name
//   const dockNameMap = crossDock.reduce((map, dockItem) => {
//     map[dockItem._id] = dockItem.cross_dock_name;
//     return map;
//   }, {});

//   // Handle dropdown change for a specific item
//   const handleDropdownChange = (event, id) => {
//     setSelectedOptions((prev) => ({
//       ...prev,
//       [id]: event.target.value,
//     }));
//   };

//   // Validate selected options
//   const validate = () => {
//     const newErrors = {};
//     rowData.forEach((item) => {
//       if (!selectedOptions[item._id]) {
//         newErrors[item._id] = "Please select a dock.";
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) {
//       return;
//     }

//     // Format selectedOptions to include dock names
//     const formattedData = Object.keys(selectedOptions).map((id) => ({
//       id,
//       cross_dock_name: dockNameMap[selectedOptions[id]],
//     }));

//     console.log("Formatted Data: ", formattedData);

//     // Implement your submit logic here, for example:
//     try {
//       const response = await Axios.post(`${AllApis.crossDocker}`, {
//         items: formattedData,
//       });
//       console.log(response, "response");

//       if (response.status === 200 || response.status === 201) {
//         dispatch(getAllProduction("", "", "", 1));
//         handleClose();
//       } else {
//         console.error("Error submitting data.");
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="lg">
//       <DialogContent>
//         <Div>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: "#7352C7", color: "white" }}>
//                 <TableCell sx={{ color: "white", px: 1 }}>SKU Code</TableCell>
//                 <TableCell sx={{ color: "white", px: 1 }}>SKU Desc</TableCell>
//                 <TableCell sx={{ color: "white", px: 1 }}>SUT</TableCell>
//                 <TableCell sx={{ color: "white", px: 1 }}>
//                   Pallet Qty.
//                 </TableCell>
//                 <TableCell sx={{ color: "white", px: 1 }}>
//                   Select Cross Dock
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rowData?.map((rowItem) => (
//                 <TableRow key={rowItem._id} sx={{ bgcolor: "#EDEBEB" }}>
//                   <TableCell sx={{ px: 1 }}>{rowItem.sku_code}</TableCell>
//                   <TableCell sx={{ px: 1 }}>
//                     {rowItem.sku_description}
//                   </TableCell>
//                   <TableCell sx={{ px: 1 }}>{rowItem.sut}</TableCell>
//                   <TableCell sx={{ px: 1 }}>{rowItem.pallet_qty}</TableCell>
//                   <TableCell sx={{ px: 1 }}>
//                     {/* Dropdown for each item */}
//                     <FormControl fullWidth error={!!errors[rowItem._id]}>
//                       <InputLabel>Select Dock</InputLabel>
//                       <Select
//                         value={selectedOptions[rowItem._id] || ""}
//                         onChange={(event) =>
//                           handleDropdownChange(event, rowItem._id)
//                         }
//                         label="Select Dock"
//                       >
//                         <MenuItem value="">
//                           <em>Select</em>
//                         </MenuItem>
//                         {crossDock.map((dockItem) => (
//                           <MenuItem key={dockItem._id} value={dockItem._id}>
//                             {dockItem.cross_dock_name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                       {errors[rowItem._id] && (
//                         <FormHelperText>{errors[rowItem._id]}</FormHelperText>
//                       )}
//                     </FormControl>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Update
//             </Button>
//           </Box>
//         </Div>
//       </DialogContent>
//     </Dialog>
//   );
// };
import Div from "@jumbo/shared/Div";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import AllApis from "app/Apis";
import { getAllProduction } from "app/redux/actions/masterAction";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const DockEntry = ({
  searchTerm,
  sort,
  sortBy,
  page,
  open,
  setOpen,
  rowData,
  setAddGroup,
}) => {
  console.log(rowData, "rowData");

  // Store the selected cross dock for all items
  const [selectedCrossDock, setSelectedCrossDock] = useState("");
  const [crossDock, setCrossDock] = useState([]);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false); // Use setOpen to close the modal
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const crossDockResponse = await Axios.get(
          `${AllApis.dropdownList.crossDockerList}`
        );
        setCrossDock(crossDockResponse.data.result);
      } catch (error) {
        console.error("Error fetching dropdown data", error);
      }
    };

    fetchDropdownData();
  }, []);

  // Create a mapping of dock ID to dock name
  const dockNameMap = crossDock.reduce((map, dockItem) => {
    map[dockItem._id] = dockItem.cross_dock_name;
    return map;
  }, {});

  // Handle dropdown change for all items
  const handleDropdownChange = (event) => {
    setSelectedCrossDock(event.target.value);
  };

  // Validate selected cross-dock
  const validate = () => {
    const newErrors = {};
    if (!selectedCrossDock) {
      newErrors.crossDock = "Please select a dock.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    // Format selectedCrossDock to include dock name
    const formattedData = rowData.map((item) => ({
      id: item._id,
      cross_dock_name: dockNameMap[selectedCrossDock],
    }));

    console.log("Formatted Data: ", formattedData);

    // Implement your submit logic here, for example:
    try {
      const response = await Axios.post(`${AllApis.crossDocker}`, {
        items: formattedData,
      });
      console.log(response, "response");
      if (response.status === 200 || response.status === 201) {
        dispatch(getAllProduction(searchTerm, sort, sortBy, page, ""));
        setAddGroup([]);
        // navigate("/dashboard/warehouseexecutive/production");
        handleClose();
      } else {
        console.error("Error submitting data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogContent>
        <Div>
          {/* Dropdown for all items */}
          <FormControl fullWidth error={!!errors.crossDock} sx={{ mb: 2 }}>
            <InputLabel>Select Dock</InputLabel>
            <Select
              value={selectedCrossDock}
              onChange={handleDropdownChange}
              label="Select Dock"
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              {crossDock.map((dockItem) => (
                <MenuItem key={dockItem._id} value={dockItem._id}>
                  {dockItem.cross_dock_name}
                </MenuItem>
              ))}
            </Select>
            {errors.crossDock && (
              <FormHelperText>{errors.crossDock}</FormHelperText>
            )}
          </FormControl>

          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#7352C7", color: "white" }}>
                <TableCell sx={{ color: "white", px: 1 }}>SKU Code</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SKU Desc</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>SUT</TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Pallet Qty.
                </TableCell>
                <TableCell sx={{ color: "white", px: 1 }}>
                  Selected Cross Dock
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData?.map((rowItem) => (
                <TableRow key={rowItem._id} sx={{ bgcolor: "#EDEBEB" }}>
                  <TableCell sx={{ px: 1 }}>{rowItem.sku_code}</TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {rowItem.sku_description}
                  </TableCell>
                  <TableCell sx={{ px: 1 }}>{rowItem.sut}</TableCell>
                  <TableCell sx={{ px: 1 }}>{rowItem.pallet_qty}</TableCell>
                  <TableCell sx={{ px: 1 }}>
                    {/* Display the selected cross dock */}
                    {selectedCrossDock
                      ? dockNameMap[selectedCrossDock]
                      : "Not selected"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Send to dock
            </Button>
          </Box>
        </Div>
      </DialogContent>
    </Dialog>
  );
};
