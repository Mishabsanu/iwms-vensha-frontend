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
import { OutboundSODetails } from "../Modal/OutboundSODetails";

export default function ListOutboundSOTable({
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
      (item) => item.sales_order_no === current.sales_order_no
    );

    if (customer) {
      customer.sales_order_no = current.sales_order_no;
      customer.totalSkuCount += current.totalSkuCount;
      customer.totalStockQty += current.totalStockQty;
    } else {
      acc.push({
        _id: current._id,
        customer_name: current?.customer_name,
        sales_order_no: current.sales_order_no,
        totalSkuCount: current.totalSkuCount,

        totalStockQty: current.totalStockQty,
        date: current.date,
        status: current.status,
      });
    }

    return acc;
  }, []);

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
      setSelectedItem(row);
      setIsModalOpen(true);
    } else {
      setSelectedItem(null);
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
                      color: "white",
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
                      color: "white",
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
                  {row.sales_order_no}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.totalSkuCount}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row.totalStockQty}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.customer_name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {isModalOpen && (
            <OutboundSODetails
              searchTerm={searchTerm}
              page={page}
              setPage={setPage}
              sort={sort}
              sortBy={sortBy}
              setSort={setSort}
              setSortBy={setSortBy}
              open={isModalOpen}
              setOpen={setIsModalOpen}
              rowData={selectedItem}
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
