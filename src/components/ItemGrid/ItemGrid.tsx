import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import ItemCard from "../ItemCard/ItemCard";
import Box from "@mui/material/Box";

const ItemGrid = ({ items }: any) => {
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

  return (
    <Box sx={{ m: 2 }}>
      <Grid container spacing={4}>
        {items.map((item: any) => (
          <ItemCard key={item.id} {...transformDataItemToItemCardProps(item)} />
        ))}
      </Grid>
    </Box>
  );
};

export default ItemGrid;
