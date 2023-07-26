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

  const handleFilterChange = (updatedFilters: Filters) => {
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

    setDisplayedProducts((prevData) => ({
      ...prevData,
      item: { ...prevData.item, products: filteredProducts },
    }));
  };

  return (
    <Box sx={{ backgroundColor: "#F2F0EA", minHeight: '100vh', height: "100%" }}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ padding: 5 }}>
        <Grid container spacing={2}>
          {/* Side Panel */}
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              fetchedData={fetchedData.item.products}
            />
          </Grid>
          {/* Main Content */}
          <Grid
            item
            xs={12}
            sm={8}
            md={9}
            lg={9}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={handleSelectChange}
                sx={{ backgroundColor: "white", width: '30%' }}
              >
                <MenuItem value={"recommended"}>Recommended</MenuItem>
                <MenuItem value={"lowestPrice"}>Lowest Price</MenuItem>
                <MenuItem value={"highestPrice"}>Highest Price</MenuItem>
                <MenuItem value={"highestDiscount"}>Highest Discount</MenuItem>
              </Select>
            </FormControl>
            {displayedProducts && (
              <ItemGrid items={displayedProducts.item.products} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
