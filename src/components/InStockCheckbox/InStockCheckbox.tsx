import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { green } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import { InStockCheckboxProps } from "../../types";

const InStockCheckbox = ({stockStatus, stockEta}: InStockCheckboxProps) => {
  const inStock = stockStatus === "R" ? true : false;
  const label = inStock ? "In Stock" : "Out of Stock";

  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            color: green[800],
            "&.Mui-checked": {
              color: green[600],
            },
          }}
          checked={inStock}
          disabled
          size="small"
        />
      }
      label={label}
    />
  );
};

export default InStockCheckbox;
