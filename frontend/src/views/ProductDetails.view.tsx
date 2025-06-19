import ProductDetails from "../components/ProductDetails";
import type { ProductModel } from "../models/ProductModel";

// Sample product data - replace with your actual data fetching
const sampleProduct: ProductModel = {
  id: "1",
  title: "Premium Cotton Hoodie",
  image:
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=60",
  images: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60",
  ],
  isWishlist: false,
  price: 89,
  originalPrice: 120,
  rating: 5,
  category: "Hoodies",
  size: ["XS", "S", "M", "L", "XL", "XXL"],
  color: "Black",
  colors: ["Black", "White", "Gray", "Navy"],
  brand: "AETHERIC FITS",
  reviews: 127,
  description:
    "Crafted from premium organic cotton, this hoodie combines comfort with contemporary style. Features a relaxed fit, kangaroo pocket, and our signature minimalist design that elevates your everyday wardrobe.",
  features: [
    "100% Organic Cotton",
    "Pre-shrunk fabric",
    "Reinforced seams",
    "Machine washable",
  ],
  inStock: true,
  sku: "AF-HOD-001",
};

export default function ProductDetailsView() {
  return (
    <div className="pt-5">
      <ProductDetails product={sampleProduct} />
    </div>
  );
}
