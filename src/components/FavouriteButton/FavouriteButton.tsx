import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FavouriteButton = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited((prevState) => !prevState);
  };

  return isFavorited ? (
    <FavoriteIcon
      onClick={handleFavoriteClick}
      style={{ color: "green" }}
      aria-label="Add to favorites"
    />
  ) : (
    <FavoriteBorderIcon
      onClick={handleFavoriteClick}
      style={{ color: "green" }}
      aria-label="Added to favorites"
    />
  );
};

export default FavouriteButton;
