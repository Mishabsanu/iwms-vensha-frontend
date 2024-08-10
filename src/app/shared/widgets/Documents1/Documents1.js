import { Card, CardActions, CardContent, Typography } from "@mui/material";

const Documents1 = ({ icone, data, field }) => {
  return (
    <Card
      sx={{
        height: 70,
        backgroundImage: "linear-gradient(135deg, #38B8F2, #843CF6)",
      }}
    >
      <CardActions
        disableSpacing
        sx={{ p: 0, alignItems: "stretch", height: "100%" }}
      >
        <CardContent sx={{ p: 2.5, flex: 1, alignSelf: "center" }}>
          {/* <Typography variant={"h4"} color={"common.white"}>
            {data}
          </Typography> */}
          <Typography variant={"h4"} color={"common.white"} mb={0}>
            {" "}
            {field} - &nbsp; {data}
          </Typography>
        </CardContent>
      </CardActions>
    </Card>
  );
};

export default Documents1;
