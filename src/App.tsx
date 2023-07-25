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
import Grid from "@mui/material/Grid"; // Import the Grid component
import FilterPanel from "./components/FilterPanel/FilterPanel";
import { Filters } from "./types";

function App() {
  const [sortBy, setSortBy] = useState("recommended");
  const [fetchedData, setFetchedData] = useState(data);
  const [displayedProducts, setDisplayedProducts] = useState(data);

  const [filters, setFilters] = useState<Filters>({
    minPrice: null,
    maxPrice: null,
    selectedBrands: [],
    onSale: false,
    inStock: false,
  });

  useEffect(() => {
    sortCardItems();
  }, [displayedProducts]);

  useEffect(() => {
    filterCardItems();
  }, [filters]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
    sortCardItems();
  };

  const handleFilterChange = (updatedFilters: any) => {
    setFilters(updatedFilters);
  };

  const sortCardItems = () => {
    const sortedProducts = [...displayedProducts.item.products];

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

    setDisplayedProducts((prevData) => ({
      ...prevData,
      item: { ...prevData.item, products: sortedProducts },
    }));
  };

  const filterCardItems = () => {
    let filteredProducts = [...data.item.products];

    // Apply the filters one by one
    if (filters.minPrice !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price.priceIncTax >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price.priceIncTax <= filters.maxPrice!
      );
    }

    if (filters.selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.selectedBrands.includes(product.brand.name)
      );
    }

    if (filters.onSale) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price.discountPercentage! > 0
      );
    }

    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(
        (product) => product.stockStatus.status === "R"
      );
    }

    // Update the state with the filtered data
    setDisplayedProducts((prevData) => ({
      ...prevData,
      item: { ...prevData.item, products: filteredProducts },
    }));
  };

  return (
    <Box sx={{ backgroundColor: "#F2F0EA" }}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ padding: 5 }}>
        <Box
          display="flex"
          flexWrap="wrap"
          sx={{ justifyContent: "space-between" }}
        >
          {/* Side Panel */}
          <Box
            width={{ xs: "100%", sm: "30%", md: "20%" }}
            mb={{ xs: 2, sm: 0 }}
          >
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              fetchedData={fetchedData.item.products}
            />
          </Box>
          {/* Main Content */}
          <Box width={{ xs: "100%", sm: "70%", md: "80%" }}>
            <Grid container spacing={2}>
              <Box sx={{ maxWidth: "30%" }}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={handleSelectChange}
                    sx={{ backgroundColor: "white" }}
                  >
                    <MenuItem value={"recommended"}>Recommended</MenuItem>
                    <MenuItem value={"lowestPrice"}>Lowest Price</MenuItem>
                    <MenuItem value={"highestPrice"}>Highest Price</MenuItem>
                    <MenuItem value={"highestDiscount"}>
                      Highest Discount
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {displayedProducts && <ItemGrid items={displayedProducts.item.products} />}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
