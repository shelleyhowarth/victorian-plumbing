import React, { useEffect } from "react";
import "./App.css";
import ItemCard from "./components/ItemCard/ItemCard";
import data from "./example-payload.json";
import { ItemCardProps } from "./types";

function App() {
  
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
    };
  };

  const arrayCardItems = data.item.products.map((item) => {
    const itemCardObj: ItemCardProps = transformDataItemToItemCardProps(item);

    return (
      <ItemCard {...itemCardObj}/>
    )
  });

  return (
    <div className="App">
      {arrayCardItems}
    </div>
  );
}

export default App;
