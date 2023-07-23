import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { ResponsiveCardMediaProps } from "../../types";

const ResponsiveCardMedia = ({ imageUrl, aspectRatio }: ResponsiveCardMediaProps) => {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: `${aspectRatio}%`,
        height: 0,
        overflow: "hidden",
      }}
    >
      <CardMedia
        image={imageUrl}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ResponsiveCardMedia;
