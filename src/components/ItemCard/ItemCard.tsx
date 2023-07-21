import React from "react";
import Card from "@mui/material/Card";
import { ItemCardProps } from "../../types";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from "@mui/material/Checkbox";
import { green } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const ItemCard = (item: ItemCardProps) => {
  const inStockCheckbox = (stockStatus: string, stockEta: string | null) => {
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

  return (
    <Grid xs={6} sm={4} md={3}>
      <Card
        variant="outlined"
        sx={{ minWidth: "30%", width: "100%", height: "100%" }}
      >
        <React.Fragment>
          <CardMedia sx={{ height: 250 }} image={item.itemImageUrl} />
          <Stack>
            <CardMedia
              sx={{ height: 20, width: 80 }}
              image={item.brandImageUrl}
            />
            <CardContent>
              <Typography
                sx={{ fontSize: 16 }}
                color="text.primary"
                gutterBottom
                noWrap
              >
                {item.productName}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Typography sx={{ mb: 1.5, fontWeight: "bold" }} color="red">
                  £{item.priceIncTax}
                </Typography>
                {inStockCheckbox(item.stockStatus, item.stockEta)}
              </Stack>
              <Stack direction="row" spacing={2}>
                <Rating value={item.averageRating} readOnly precision={0.1} />
                <Typography>{item.reviewsCount}</Typography>
              </Stack>
              <Typography sx={{ fontSize: 16 }}>
                {item.isRecommended ? 'Recommended' : ''}
              </Typography>
            </CardContent>
          </Stack>
        </React.Fragment>
      </Card>
    </Grid>
  );
};

export default ItemCard;
