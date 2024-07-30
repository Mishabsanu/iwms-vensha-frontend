import { Box, CircularProgress } from "@mui/material";
import React from "react";

const FullScreenLoader = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          top: 0,
          left: 0,
          bgcolor: "transparent",
          zIndex: 1,
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}>
          <CircularProgress />
        </Box>
      </Box>
    </>
  );
};

export default FullScreenLoader;
