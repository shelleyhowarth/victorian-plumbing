import React, { SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import { FormControlLabel, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { FilterPanelProps } from "../../types";

const FilterPanel = ({
  filters,
  onFilterChange,
  fetchedData,
}: FilterPanelProps) => {
  // Get unique brand names using an array and checking for duplicates
  const uniqueBrandsArray = fetchedData
    ? fetchedData
        .reduce((brands: string[], item: any) => {
          if (
            item.brand &&
            item.brand.name &&
            !brands.includes(item.brand.name)
          ) {
            brands.push(item.brand.name);
          }
          return brands;
        }, [])
        .sort() //Sorts alphabetically
    : [];

  const handleFilterChange = (event: SyntheticEvent) => {
    const { name, value, type, checked } = event.target as HTMLInputElement; 
    let updatedFilters = { ...filters }; 

    if (type === "checkbox") { //Go through all checkbox filters first
      if (name === "onSale") {
        updatedFilters.onSale = checked;
      } else if (name === "inStock") {
        updatedFilters.inStock = checked;
      } else {
        const selectedBrands = updatedFilters.selectedBrands;

        if (checked) {
          // Checking what brands have been checked and putting them into the selectedBrands array
          updatedFilters.selectedBrands = [...selectedBrands, value];
        } else {
          updatedFilters.selectedBrands = selectedBrands.filter(
            // Checking what brands haven't been checked and removing them from the selectedBrands array
            (brand) => brand !== value
          );
        }
      }
    } else { //Go through price filters
      if (name === "minPrice") {
        updatedFilters.minPrice = value === "" ? null : +value; // Convert empty string to null for minPrice
      } else if (name === "maxPrice") {
        updatedFilters.maxPrice = value === "" ? null : +value; // Convert empty string to null for maxPrice
      }
    }

    onFilterChange(updatedFilters);
  };

  return (
    <>
      <Typography variant="h6">Filter By</Typography>
      <Box
        sx={{
          backgroundColor: "white",
          height: "auto",
          padding: 2,
          width: "80%",
        }}
      >
        <Typography variant="h6">Price</Typography>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            £
          </Typography>
          <TextField
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min"
            sx={{ width: "35%" }}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            to
          </Typography>
          <TextField
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max"
            sx={{ width: "35%" }}
          />
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Typography variant="h6">Availability</Typography>

        <FormControlLabel
          control={
            <Checkbox
              name="inStock"
              checked={filters.inStock}
              onChange={handleFilterChange}
              size="small"
            />
          }
          label="In Stock"
        />
        <Divider sx={{ my: 1 }} />

        <Typography variant="h6">On Sale</Typography>

        <FormControlLabel
          control={
            <Checkbox
              name="onSale"
              checked={filters.onSale}
              onChange={handleFilterChange}
              size="small"
            />
          }
          label="Yes"
        />
        <Divider sx={{ my: 1 }} />

        <Typography variant="h6">Brand</Typography>
        <Stack direction={"column"}>
          {uniqueBrandsArray.map((brandName: string) => (
            <FormControlLabel
              key={brandName}
              control={
                <Checkbox
                  name="selectedBrands"
                  value={brandName}
                  checked={filters.selectedBrands.includes(brandName)}
                  onChange={handleFilterChange}
                  size="small"
                />
              }
              label={brandName}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default FilterPanel;
