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
import FullScreenLoader from "app/components/ListingPageLoader";
import { displayDateFun } from "app/utils/constants/functions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ListBinTable({
  searchTerm,
  page,
  setPage,
  sort,
  sortBy,
  setSort,
  setSortBy,
}) {
  const { binMaster, TotalPage, loading } = useSelector(
    (state) => state.masterReducer
  );
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permissions = useSelector(
    (state) => state?.userReducer?.user?.[0]?.role_id?.permissions
  );

  const handleSort = (property) => {
    setSort(sort === "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

  const handleItemAction = (menuItem) => {
    switch (menuItem.action) {
      case "edit":
        navigate("/master/bin/edit", { state: menuItem?.data });
        break;

      default:
        break;
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setLoader(loading);
  }, [loading]);

  return (
    <>
      {loader && <FullScreenLoader />}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
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
                }}
              >
                <TableSortLabel
                  active={sortBy === "storage_type"}
                  direction={sort}
                  onClick={() => handleSort("storage_type")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white",
                    },
                  }}
                >
                  Storage Type
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "150px",
                  verticalAlign: "middle",
                  color: "white",
                  px: 1,
                }}
              >
                Storage Section
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "110px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                <TableSortLabel
                  active={sortBy === "bin_no"}
                  direction={sort}
                  onClick={() => handleSort("bin_no")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white",
                    },
                  }}
                >
                  Bin No
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  minWidth: "170px",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                <TableSortLabel
                  active={sortBy === "bin_combination"}
                  direction={sort}
                  onClick={() => handleSort("bin_combination")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white",
                    },
                  }}
                >
                 Bin Combination
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  px: 1,
                  minWidth: "200px",
                  verticalAlign: "middle",
                }}
              >
                <TableSortLabel
                  active={sortBy === "description"}
                  direction={sort}
                  onClick={() => handleSort("description")}
                  sx={{
                    color: "white",
                    "&:hover": { color: "white" },
                    "&.MuiTableSortLabel-root.Mui-active": {
                      color: "white",
                    },
                  }}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "white",
                  minWidth: "130px",
                }}
              >
                Bin Capacity
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "white",
                    minWidth: "130px",
                }}
              >
                3 Digit Code
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "white",
                  minWidth: "150px",
                }}
              >
               Type
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  color: "white",
                  minWidth: "150px",
                }}
              >
                Created Date
              </TableCell>
              {permissions?.bin_master_edit === true && (
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
            {binMaster?.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.storage_type}
                </TableCell>
                <TableCell sx={{ textAlign: "left", px: 1 }}>
                  {row?.storage_section}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row?.bin_no}</TableCell>
                <TableCell sx={{ textAlign: "left" }}>{row?.bin_combination}</TableCell>
                <TableCell sx={{ textAlign: "left", px: 1 }}>
                  {row?.description}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.bin_capacity}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.digit_3_code}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {row?.type?.type}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>
                  {displayDateFun(row?.created_at)}
                </TableCell>
                {permissions?.bin_master_edit === true && (
                  <TableCell sx={{ textAlign: "left" }}>
                    <JumboDdMenu
                      icon={<MoreHorizIcon />}
                      menuItems={[
                        {
                          icon: <EditIcon />,
                          title: "Edit Bin Details",
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
