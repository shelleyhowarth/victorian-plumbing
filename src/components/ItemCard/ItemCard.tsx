import React from "react";
import Card from '@mui/material/Card';
import ItemDetails from "./ItemDetails";

const ItemCard = () => {
  return (
    <div>
      <Card variant="outlined">
          <ItemDetails/>
      </Card>
    </div>
  );
};

export default ItemCard;
