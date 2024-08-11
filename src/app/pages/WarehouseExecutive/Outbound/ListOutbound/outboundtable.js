import {
  Checkbox,
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
import { useState } from "react";
import { useSelector } from "react-redux";
import { OutboundDetails } from "../Modal/OutboundDetails";

export default function ListOutboundTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { outbound, TotalPage, loading } = useSelector(
    (state) => state.masterReducer
  );

  const groupedData = outbound.reduce((acc, current) => {
    const customer = acc.find(
      (item) => item.customer_name === current.customerDetails?.customer_name
    );
    console.log("customerssss", customer);
    if (customer) {
      customer.order_number = current.order_number;
      customer.sku_count += current.sku_count;
      customer.stock_qty += current.stock_qty;
    } else {
      acc.push({
        _id: current._id,
        customer_name: current.customerDetails?.customer_name,
        order_number: current.order_number,
        sku_count: current.sku_count,
        
stock_qty: current.
        stock_qty,
        date: current.date,
        status: current.status,
      });
    }

    return acc;
  }, []);
  console.log("groupedData", groupedData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );
  const [selectedItem, setSelectedItem] = useState(null);
  console.log(selectedItem, "selectedItem");

  const handleSort = (property) => {
    setSort(sort === "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCheckbox = (e, row) => {
    if (e.target.checked) {
      setSelectedItem(row); // Set the selected item
      setIsModalOpen(true); // Open the modal when an item is selected
    } else {
      setSelectedItem(null); // Clear the selection if unchecked
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}

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
                  color: "white",
                  "&:hover": { color: "white" },
                  "&.MuiTableSortLabel-root.Mui-active": {
                    color: "white", // Set the color for the active state
                  },
                }}
              >
                Select
              </TableCell>
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
                      color: "white", // Set the color for the active state
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
                  active={sortBy === "order_count"}
                  direction={sort}
                  onClick={() => handleSort("order_count")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Order Number
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
                  active={sortBy === "sku_count"}
                  direction={sort}
                  onClick={() => handleSort("sku_count")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  SKU Count
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
                  active={sortBy === "stock_qty"}
                  direction={sort}
                  onClick={() => handleSort("stock_qty")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white", // Set the color for the active state
                    },
                  }}
                >
                  Order Qty Count
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
                Customer Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedData?.map((row, i) => (
              <TableRow key={i}>
                {permissions?.outbound_master_create && (
                  <TableCell sx={{ textAlign: "left", px: 1 }}>
                    <Checkbox
                      onClick={(event) => handleCheckbox(event, row)}
                      color="primary"
                      checked={selectedItem?._id === row._id}
                    />
                  </TableCell>
                )}
                <TableCell
                  sx={{
                    textAlign: "left",
                  }}
                >
                  {displayDateFun(row.date)}
                </TableCell>

                <TableCell sx={{ textAlign: "left" }}>
                  {row.order_number}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.sku_count}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.stock_qty}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.customer_name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {isModalOpen && (
            <OutboundDetails
              searchTerm={searchTerm}
              page={page}
              setPage={setPage}
              sort={sort}
              sortBy={sortBy}
              setSort={setSort}
              setSortBy={setSortBy}
              open={isModalOpen}
              setOpen={setIsModalOpen} // Ensure this matches the prop expected by DockEntry
              rowData={selectedItem} // Pass the selected item to the modal
            />
          )}
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
    </>
  );
}
