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

export interface Filters {
  minPrice: number | null;
  maxPrice: number | null;
  selectedBrands: string[]; 
  onSale: boolean;
  inStock: boolean;
}

export interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (updatedFilters: {
    minPrice: number | null;
    maxPrice: number | null;
    selectedBrands: string[];
    onSale: boolean;
    inStock: boolean;
  }) => void;
  fetchedData: any[];
}