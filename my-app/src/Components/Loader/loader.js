import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress size="2rem" sx={{ color: "black" }} />
        <span className="sr-only">Loading...</span>
      </Box>
    </div>
  );
};

export default Loader;
