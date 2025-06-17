import "../css/Home.css";
import ProductItems from "../components/ProductItems";
import type { ProductModel } from "../models/ProductModel";
import Banner from "../components/Banner";
import FeaturedCollectionGrid from "../components/FeaturedCollectionGrid";
import NewsLetter from "../components/NewsLetter";

const productList: ProductModel[] = [
  {
    title: "Product 1",
    image:
      "https://images.unsplash.com/photo-1628784230353-5bee16e2f005?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW1hZ2V8ZW58MHwxfDB8fHww",
    isWishlist: false,
    price: 100,
    rating: 4,
    category: "Men",
    size: ["S", "M", "L", "XL"],
    color: "White",
    brand: "FRAXON",
    reviews: 24,
  },
  {
    title: "Product 2",
    image:
      "https://images.unsplash.com/photo-1628784230353-5bee16e2f005?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW1hZ2V8ZW58MHwxfDB8fHww",
    isWishlist: true,
    price: 300,
    rating: 3,
    category: "Men",
    size: ["S", "M", "L", "XL"],
    color: "White",
    brand: "FRAXON",
    reviews: 24,
  },
  {
    title: "Product 3",
    image:
      "https://images.unsplash.com/photo-1628784230353-5bee16e2f005?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW1hZ2V8ZW58MHwxfDB8fHww",
    isWishlist: true,
    price: 500,
    rating: 5,
    category: "Men",
    size: ["S", "M", "L", "XL"],
    color: "White",
    brand: "FRAXON",
    reviews: 24,
  },
  {
    title: "Product 4",
    image:
      "https://images.unsplash.com/photo-1628784230353-5bee16e2f005?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW1hZ2V8ZW58MHwxfDB8fHww",
    isWishlist: false,
    price: 800,
    rating: 4,
    category: "Men",
    size: ["S", "M", "L", "XL"],
    color: "White",
    brand: "FRAXON",
    reviews: 24,
  },
];

export default function HomeView() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
          <div className="hero-shape hero-shape-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">✨ New Collection 2024</div>

          <h1 className="hero-title">
            Fashion That
            <span className="hero-title-highlight"> Defines </span>
            Your Style
          </h1>

          <p className="hero-subtitle">
            Discover the latest trends and timeless pieces that express
            <br />
            your unique personality and elevate your wardrobe to new heights
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              Shop Now
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-secondary">View Collection</button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="text-dark">Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="text-dark">Premium Products</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="text-dark">Fashion Brands</span>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero Section */}
      {/* Products Section */}
      <div className="products-section">
        <div className="products-header">
          <h2 className="products-title">New Arrivals</h2>
          <p className="products-subtitle">
            Stay trendy with our new arrivals that are built to make you look
            your best
          </p>
        </div>
        <ProductItems products={productList} />
        <div className="d-flex align-items-center justify-content-center pt-5">
          <button className="btn-secondary">
            See All <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
      {/* End Products Section */}
      {/* Banner Section */}
      <Banner />
      {/* End Banner Section */}
      {/* Featured Collection Grid */}
      <FeaturedCollectionGrid />
      {/* End Featured Collection Grid */}
      {/* News Letter */}
      <NewsLetter />
      {/* End News Letter */}
    </div>
  );
}
