import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";


const FilterPanel = () => {

  return (
    <Box sx={{backgroundColor: 'white', height: '100%', mr: 5}}>
        <Typography>Filter By</Typography>
    </Box>
  );
};

export default FilterPanel;
