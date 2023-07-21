import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./example-payload.json";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ItemGrid from "./components/ItemGrid/ItemGrid";

function App() {
  const [sortBy, setSortBy] = useState("recommended");
  const [fetchedData, setFetchedData] = useState(data);

  useEffect(() => {
    sortCardItems();
  }, [fetchedData]);

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
    sortCardItems();
  };

  const sortCardItems = () => {
    // Clone the products array before sorting to avoid mutating the original state
    const sortedProducts = [...fetchedData.item.products];

    if (sortBy === "recommended") {
      sortedProducts.sort(function (x, y) {
        return x.attributes.isRecommended === y.attributes.isRecommended
          ? 0
          : x.attributes.isRecommended
          ? -1
          : 1;
      });
    } else if (sortBy === "lowestPrice") {
      sortedProducts.sort((a, b) => a.price.priceIncTax - b.price.priceIncTax);
    } else if (sortBy === "highestPrice") {
      sortedProducts.sort((a, b) => b.price.priceIncTax - a.price.priceIncTax);
    } else if (sortBy === "highestDiscount") {
      sortedProducts.sort((a, b) => {
        if (
          a.price.discountPercentage !== null &&
          b.price.discountPercentage !== null
        ) {
          return b.price.discountPercentage - a.price.discountPercentage;
        }
        if (a.price.discountPercentage !== null) {
          return -1;
        }
        if (b.price.discountPercentage !== null) {
          return 1;
        }
        return 0;
      });
    }

    setFetchedData((prevData) => ({
      ...prevData,
      item: { ...prevData.item, products: sortedProducts },
    }));
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Box sx={{ maxWidth: "30%" }}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={sortBy}
              label="Sort By"
              onChange={handleChange}
            >
              <MenuItem value={"recommended"}>Recommended</MenuItem>
              <MenuItem value={"lowestPrice"}>Lowest Price</MenuItem>
              <MenuItem value={"highestPrice"}>Highest Price</MenuItem>
              <MenuItem value={"highestDiscount"}>Highest Discount</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {fetchedData && <ItemGrid items={fetchedData.item.products}/>}
      </Container>
    </>
  );
}

export default App;
