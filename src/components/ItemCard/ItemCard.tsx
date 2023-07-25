import React from "react";
import Card from "@mui/material/Card";
import { ItemCardProps } from "../../types";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import InStockCheckbox from "../InStockCheckbox/InStockCheckbox";
import FavouriteButton from "../FavouriteButton/FavouriteButton";
import ResponsiveCardMedia from "../ResponsiveCardMedia/ResponsiveCardMedia";

const ItemCard = (item: ItemCardProps) => {
  return (
    <Grid xs={12} sm={6} md={3} lg={3} xl={2} sx={{ paddingLeft: 0 }}>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          border: "none",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <ResponsiveCardMedia imageUrl={item.itemImageUrl} aspectRatio={100} />
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{
                  fontSize: 16,
                  lineHeight: "1.2",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                variant="subtitle1"
                color="text.primary"
                gutterBottom
              >
                {item.productName}
              </Typography>
            <FavouriteButton />
          </Stack>

          <Stack direction="row" spacing={4} alignItems="baseline">
            <Typography sx={{ fontSize: 22, fontWeight: "bold", color: "red" }}>
              £{item.priceIncTax}
            </Typography>

            {item.wasPriceIncTax && (
              <Typography
                sx={{
                  fontSize: 16,
                  color: "gray",
                  textDecoration: "line-through",
                }}
              >
                Was £{item.wasPriceIncTax}
              </Typography>
            )}
          </Stack>

          <InStockCheckbox
            stockStatus={item.stockStatus}
            stockEta={item.stockEta}
          />
          <Stack direction="row" spacing={2}>
            <Rating value={item.averageRating} readOnly precision={0.1} />
            <Typography>{item.reviewsCount}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ItemCard;
