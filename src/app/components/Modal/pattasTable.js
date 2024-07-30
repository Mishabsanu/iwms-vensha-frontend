import Div from "@jumbo/shared/Div";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const PattasTable = ({ data, heading }) => {
  const natural = parseInt(data?.natural) || 0;
  const dyed = parseInt(data?.dyed) || 0;

  const smoked = parseInt(data?.smoked) || 0;
  const total = parseInt(data?.total) || 0;
  return (
    <Div>
      <Typography variant="h4" fontWeight={600}>
        {heading}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow sx={{
              bgcolor: "#7352C7", color: "white", "& .MuiTableCell-root": {
                py: 2,
              },
            }}>
            <TableCell sx={{ color: "white" }}>Natural</TableCell>
            <TableCell sx={{ color: "white" }}>Dyed</TableCell>
            <TableCell sx={{ color: "white" }}>Smoked</TableCell>
            <TableCell sx={{ color: "white" }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ bgcolor: "#EDEBEB" }}>
            <TableCell>{natural}</TableCell>
            <TableCell>{dyed}</TableCell>
            <TableCell>{smoked}</TableCell>
            <TableCell>{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Div>
  );
};
