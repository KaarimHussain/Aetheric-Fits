export interface ProductModel {
  id?: string;
  title: string;
  image: string;
  images?: string[];
  isWishlist: boolean;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
  size: string[];
  color: string;
  colors?: string[];
  brand: string;
  reviews: number;
  description?: string;
  features?: string[];
  inStock?: boolean;
  sku?: string;
}
