import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, FormControlLabel, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";

// TODO: Type the props
const FilterPanel = ({ filters, onFilterChange, fetchedData }: any) => {
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

  const handleFilterChange = (event: any) => {
    const { name, value, type, checked } = event.target;

    let updatedFilters = { ...filters }; // Create a copy of the filters object

    if (type === "checkbox") {
      if (name === "onSale") {
        updatedFilters.onSale = checked;
      } else if (name === "inStock") {
        updatedFilters.inStock = checked;
      } else {
        // Handle brand checkboxes
        const selectedBrands = updatedFilters.selectedBrands || [];

        if (checked) {
          // Add the brand to the selectedBrands array if it's not already there
          updatedFilters.selectedBrands = [...selectedBrands, value];
        } else {
          // Remove the brand from the selectedBrands array
          updatedFilters.selectedBrands = selectedBrands.filter(
            (brand: string) => brand !== value
          );
        }
      }
    } else {
      // Handle other input types (e.g., price range)
      updatedFilters[name] = value;
    }

    // Call the onFilterChange callback with the updated filters object
    onFilterChange(updatedFilters);
  };

  return (
    <>
      <Typography variant="h6">Filter By</Typography>
      <Box sx={{ backgroundColor: "white", height: "100%", mr: 5, padding: 2 }}>
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
            sx={{ width: "30%" }}
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
            sx={{ width: "30%" }}
          />
          {/* <Button
            sx={{
              backgroundColor: "gray",
              width: "20%",
              height: "30%",
              color: "white",
            }}
          >
            Go
          </Button> */}
        </Stack>
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
        <Typography variant="h6">Brand</Typography>
        <Stack direction={"column"}>
          {uniqueBrandsArray.map((brandName: string) => (
            <FormControlLabel
              key={brandName}
              control={
                <Checkbox
                  name="selectedBrands"
                  value={brandName}
                  //   checked={filters.selectedBrands.includes(brandName)}
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
