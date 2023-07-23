export interface ItemCardProps {
  id: string;
  productName: string;
  itemImageUrl: string;
  itemImageAltText: string;
  averageRating: any;
  reviewsCount: number;
  wasPriceIncTax: any;
  priceIncTax: number;
  isOnPromotion: boolean;
  discountPercentage: any;
  isBestSeller: boolean;
  brandImageUrl: string;
  brandImageAltText: string;
  stockStatus: string;
  stockEta: string | null;
  isRecommended: boolean;
}

export interface InStockCheckboxProps {
  stockStatus: string;
  stockEta: string | null;
}

export interface ResponsiveCardMediaProps {
  imageUrl: string;
  aspectRatio: number;
}