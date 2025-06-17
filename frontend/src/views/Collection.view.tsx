"use client";
import { ProductModel } from "../models/ProductModel";
import { CollectionModel } from "../models/CollectionModel";
import { useEffect, useState } from "react";
import "../css/Collection.css";

export default function CollectionView() {
  const [collections, setCollections] = useState<CollectionModel[]>([
    {
      id: "summer-2024",
      title: "Summer 2024",
      subtitle: "Embrace the Heat",
      description:
        "Discover our breathable, lightweight collection designed for the hottest days. From breezy linen shirts to comfortable shorts, stay cool while looking your best.",
      image:
        "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=800&auto=format&fit=crop&q=60",
      featured: true,
      productCount: 24,
      tags: ["Summer", "Casual", "Lightweight"],
    },
    {
      id: "formal-elegance",
      title: "Formal Elegance",
      subtitle: "Sophisticated Style",
      description:
        "Elevate your professional wardrobe with our premium formal collection. Tailored suits, crisp shirts, and elegant accessories for those who mean business.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
      featured: true,
      productCount: 18,
      tags: ["Formal", "Business", "Elegant"],
    },
    {
      id: "active-wear",
      title: "Active Performance",
      subtitle: "Move With Confidence",
      description:
        "Engineered for movement, our active collection combines cutting-edge fabrics with ergonomic designs. Perfect for workouts, runs, or casual athletic style.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60",
      featured: false,
      productCount: 32,
      tags: ["Active", "Sports", "Performance"],
    },
    {
      id: "winter-essentials",
      title: "Winter Essentials",
      subtitle: "Embrace the Cold",
      description:
        "Stay warm without sacrificing style. Our winter collection features premium insulated jackets, cozy sweaters, and accessories designed for the coldest days.",
      image:
        "https://images.unsplash.com/photo-1608257735063-6c48e4170449?w=800&auto=format&fit=crop&q=60",
      featured: false,
      productCount: 27,
      tags: ["Winter", "Warm", "Cozy"],
    },
    {
      id: "minimalist",
      title: "Minimalist Basics",
      subtitle: "Less is More",
      description:
        "Timeless essentials with clean lines and neutral tones. Our minimalist collection focuses on versatile pieces that form the foundation of any wardrobe.",
      image:
        "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&auto=format&fit=crop&q=60",
      featured: true,
      productCount: 15,
      tags: ["Minimalist", "Basics", "Timeless"],
    },
    {
      id: "urban-street",
      title: "Urban Street",
      subtitle: "City-Inspired Style",
      description:
        "Bold graphics, relaxed fits, and contemporary designs inspired by urban culture. Make a statement with our street-ready collection.",
      image:
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=60",
      featured: false,
      productCount: 22,
      tags: ["Urban", "Street", "Contemporary"],
    },
  ]);

  const [selectedCollection, setSelectedCollection] =
    useState<CollectionModel | null>(null);
  const [collectionProducts, setCollectionProducts] = useState<ProductModel[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch products for a collection
  useEffect(() => {
    if (selectedCollection) {
      setIsLoading(true);
      // Simulate API call to fetch products for the selected collection
      setTimeout(() => {
        const dummyProducts: ProductModel[] = [
          {
            title: "Premium Cotton T-Shirt",
            image:
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60",
            isWishlist: false,
            price: 2500,
            category: "Men",
            size: ["S", "M", "L", "XL"],
            color: "White",
            brand: "FRAXON",
            rating: 4.5,
            reviews: 24,
          },
          {
            title: "Elegant Summer Dress",
            image:
              "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=60",
            isWishlist: true,
            price: 4500,
            category: "Women",
            size: ["XS", "S", "M", "L"],
            color: "Blue",
            brand: "FITS",
            rating: 4.8,
            reviews: 42,
          },
          {
            title: "Classic Denim Jeans",
            image:
              "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60",
            isWishlist: false,
            price: 3500,
            category: "Men",
            size: ["30", "32", "34", "36"],
            color: "Blue",
            brand: "FRAXON",
            rating: 4.3,
            reviews: 18,
          },
          {
            title: "Kids Colorful Hoodie",
            image:
              "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=60",
            isWishlist: false,
            price: 2800,
            category: "Kids",
            size: ["4-5Y", "6-7Y", "8-9Y"],
            color: "Red",
            brand: "FITS",
            rating: 4.6,
            reviews: 31,
          },
          {
            title: "Formal Blazer",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60",
            isWishlist: true,
            price: 8500,
            category: "Men",
            size: ["S", "M", "L", "XL"],
            color: "Black",
            brand: "FRAXON",
            rating: 4.7,
            reviews: 15,
          },
          {
            title: "Casual Sneakers",
            image:
              "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=60",
            isWishlist: false,
            price: 5500,
            category: "Footwear",
            size: ["7", "8", "9", "10", "11"],
            color: "White",
            brand: "FITS",
            rating: 4.4,
            reviews: 28,
          },
        ];
        setCollectionProducts(dummyProducts);
        setIsLoading(false);
      }, 800);
    }
  }, [selectedCollection]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCollectionClick = (collection: CollectionModel) => {
    setSelectedCollection(collection);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToCollections = () => {
    setSelectedCollection(null);
    setSortBy("featured");
    setActiveFilter("all");
  };

  const filteredCollections = collections.filter((collection) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "featured") return collection.featured;
    return collection.tags.includes(activeFilter);
  });

  // Get unique tags from all collections
  const allTags = Array.from(
    new Set(collections.flatMap((collection) => collection.tags))
  );

  return (
    <div className="collection-page">
      {/* Header */}
      <div className="collection-header">
        <div className="collection-container">
          {selectedCollection ? (
            <div className="collection-detail-header">
              <button onClick={handleBackToCollections} className="back-button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                Back to Collections
              </button>
              <div className="collection-hero">
                <div className="collection-hero-content">
                  <h1 className="collection-title">
                    {selectedCollection.title}
                  </h1>
                  <p className="collection-subtitle">
                    {selectedCollection.subtitle}
                  </p>
                  <p className="collection-description">
                    {selectedCollection.description}
                  </p>
                  <div className="collection-meta">
                    <div className="collection-tags">
                      {selectedCollection.tags.map((tag) => (
                        <span key={tag} className="collection-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="collection-count">
                      {selectedCollection.productCount} Products
                    </div>
                  </div>
                </div>
                <div className="collection-hero-image">
                  <img
                    src={selectedCollection.image || "/placeholder.svg"}
                    alt={selectedCollection.title}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="collections-header-content">
              <h1 className="collections-title">Our Collections</h1>
              <p className="collections-subtitle">
                Explore our carefully curated collections designed for every
                style and occasion
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="collection-container">
        {selectedCollection ? (
          <div className="collection-products-section">
            {/* Collection Products Toolbar */}
            <div className="collection-toolbar">
              <div className="toolbar-left">
                <div className="results-count">
                  <span>
                    {collectionProducts.length} products in this collection
                  </span>
                </div>
              </div>
              <div className="toolbar-right">
                <div className="sort-container">
                  <label htmlFor="collection-sort">Sort by:</label>
                  <select
                    id="collection-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Collection Products */}
            {isLoading ? (
              <div className="collection-loading">
                <div className="loading-spinner"></div>
                <p>Loading collection products...</p>
              </div>
            ) : (
              <div className="collection-products-grid">
                {collectionProducts.map((product, index) => (
                  <div key={index} className="collection-product-card">
                    <div className="product-image-container">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="product-image"
                      />
                      <div className="product-overlay">
                        <button className="quick-view-btn">Quick View</button>
                      </div>
                      <button
                        className={`wishlist-btn ${
                          product.isWishlist ? "active" : ""
                        }`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill={product.isWishlist ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>

                    <div className="product-info">
                      <div className="product-meta">
                        <span className="product-brand">{product.brand}</span>
                        <span className="product-category">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="product-title">{product.title}</h3>
                      <div className="product-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill={
                                i < Math.floor(product.rating)
                                  ? "currentColor"
                                  : "none"
                              }
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <span className="rating-text">({product.reviews})</span>
                      </div>
                      <div className="product-price">
                        <span className="current-price">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="collections-section">
            {/* Collections Filter */}
            <div className="collections-filter">
              <button
                className={`filter-btn ${
                  activeFilter === "all" ? "active" : ""
                }`}
                onClick={() => setActiveFilter("all")}
              >
                All Collections
              </button>
              <button
                className={`filter-btn ${
                  activeFilter === "featured" ? "active" : ""
                }`}
                onClick={() => setActiveFilter("featured")}
              >
                Featured
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`filter-btn ${
                    activeFilter === tag ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Collections Grid */}
            <div className="collections-grid">
              {filteredCollections.map((collection) => (
                <div
                  key={collection.id}
                  className={`collection-card ${
                    collection.featured ? "featured" : ""
                  }`}
                  onClick={() => handleCollectionClick(collection)}
                >
                  <div className="collection-card-image">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                    />
                    {collection.featured && (
                      <div className="featured-badge">Featured</div>
                    )}
                  </div>
                  <div className="collection-card-content">
                    <h2 className="collection-card-title">
                      {collection.title}
                    </h2>
                    <p className="collection-card-subtitle">
                      {collection.subtitle}
                    </p>
                    <div className="collection-card-meta">
                      <div className="collection-card-tags">
                        {collection.tags.map((tag) => (
                          <span key={tag} className="collection-card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="collection-card-count">
                        {collection.productCount} Products
                      </div>
                    </div>
                    <button className="view-collection-btn">
                      View Collection
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
