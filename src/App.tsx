import React, { useEffect, useState } from "react";
import "./App.css";
import ItemCard from "./components/ItemCard/ItemCard";
import data from "./example-payload.json";
import { ItemCardProps } from "./types";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { getProducts } from "./api";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function App() {
  // const [apiData, setApiData] = React.useState([]);

  // const getData = () =>
  //   getProducts({}).then((res) => {
  //     if (res.status === 200) {
  //       setApiData(res.data);
  //       console.log(data);
  //     } else {
  //       console.log(res);
  //     }
  //   });

  // React.useEffect(() => {
  //   getData();
  // }, []);

  const [sortBy, setSortBy] = useState("recommended");
  const [fetchedData, setFetchedData] = useState(data);

  useEffect(() => {
    fetchedData.item.products.sort(function (x, y) {
      return x.attributes.isRecommended === y.attributes.isRecommended
        ? 0
        : x.attributes.isRecommended
        ? -1
        : 1;
    });
    console.log(fetchedData);
    sortCardItems();
  }, [sortBy]);

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  const transformDataItemToItemCardProps = (item: any) => {
    return {
      id: item.id,
      productName: item.productName,
      itemImageUrl: item.image.url,
      itemImageAltText: item.image.attributes.imageAltText,
      averageRating: item.averageRating,
      reviewsCount: item.reviewsCount,
      wasPriceIncTax: item.price.wasPriceIncTax,
      priceIncTax: item.price.priceIncTax,
      isOnPromotion: item.price.isOnPromotion,
      discountPercentage: item.price.discountPercentage,
      isBestSeller: item.attributes.isBestSeller,
      brandImageUrl: item.brand.brandImage.url,
      brandImageAltText: item.brand.brandImage.attributes.imageAltText,
      stockStatus: item.stockStatus.status,
      stockEta: item.stockStatus.eta,
      isRecommended: item.attributes.isRecommended,
    };
  };

  const arrayCardItems = fetchedData.item.products.map((item) => {
    const itemCardObj: ItemCardProps = transformDataItemToItemCardProps(item);

    return <ItemCard {...itemCardObj} />;
  });

  const sortCardItems = () => {
    // Clone the products array before sorting to avoid mutating the original state
    const sortedProducts = [...fetchedData.item.products];

    if (sortBy === "lowestPrice") {
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
      })
    }

    setFetchedData((prevData) => ({
      ...prevData,
      item: { ...prevData.item, products: sortedProducts },
    }));
  }

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

        <Box sx={{ m: 2 }}>
          <Grid container spacing={4}>
            {arrayCardItems}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default App;
