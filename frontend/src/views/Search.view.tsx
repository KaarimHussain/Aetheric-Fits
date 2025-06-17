"use client";

import { useState, useEffect, useMemo } from "react";
import "../css/Search.css";
import type { ProductModel } from "../models/ProductModel";

export default function SearchView() {
  const [products] = useState<ProductModel[]>([
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
    {
      title: "Floral Print Blouse",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=60",
      isWishlist: true,
      price: 3200,
      category: "Women",
      size: ["XS", "S", "M", "L", "XL"],
      color: "Pink",
      brand: "FITS",
      rating: 4.2,
      reviews: 22,
    },
    {
      title: "Sports Track Pants",
      image:
        "https://images.unsplash.com/photo-1506629905607-d405b7a82d52?w=600&auto=format&fit=crop&q=60",
      isWishlist: false,
      price: 2900,
      category: "Men",
      size: ["S", "M", "L", "XL", "XXL"],
      color: "Gray",
      brand: "FRAXON",
      rating: 4.1,
      reviews: 19,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Get URL search params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    if (query) {
      setSearchQuery(query);
    }

    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Filter and sort products based on search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    setIsLoading(true);

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort results
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Keep original order for newest
        break;
      default: // relevance
        // Keep filtered order for relevance
        break;
    }

    setTimeout(() => setIsLoading(false), 300);
    return sorted;
  }, [products, searchQuery, sortBy]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchQuery(query);

      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set("q", query);
      window.history.pushState({}, "", url.toString());

      // Save to recent searches
      const updated = [
        query,
        ...recentSearches.filter((s) => s !== query),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    window.history.pushState({}, "", url.toString());
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const popularSearches = [
    "t-shirt",
    "jeans",
    "dress",
    "shoes",
    "jacket",
    "hoodie",
  ];

  return (
    <div className="search-page">
      {/* Search Header */}
      <div className="search-header">
        <div className="px-5 ">
          <div className="search-header-content">
            <h1 className="search-title">Search Products</h1>
            <p className="search-subtitle">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="search-input-section">
            <div className="search-input-container">
              <svg
                className="search-input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search for products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSearch(searchQuery)
                }
                className="search-input"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="search-clear"
                  aria-label="Clear search"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={() => handleSearch(searchQuery)}
              className="search-button"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 mx-5">
        {/* Search Suggestions */}
        {!searchQuery && (
          <div className="search-suggestions-section">
            {recentSearches.length > 0 && (
              <div className="suggestions-group">
                <h3 className="suggestions-title">Recent Searches</h3>
                <div className="suggestions-list">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="suggestion-item recent"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                      </svg>
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="suggestions-group">
              <h3 className="suggestions-title">Popular Searches</h3>
              <div className="suggestions-list">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="suggestion-item popular"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    </svg>
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="search-results-section">
            {/* Results Header */}
            <div className="results-header">
              <div className="results-info">
                <h2 className="results-title">
                  {isLoading
                    ? "Searching..."
                    : `Search Results for "${searchQuery}"`}
                </h2>
                {!isLoading && (
                  <p className="results-count">
                    {searchResults.length}{" "}
                    {searchResults.length === 1 ? "product" : "products"} found
                  </p>
                )}
              </div>

              {searchResults.length > 0 && (
                <div className="results-sort">
                  <label htmlFor="sort">Sort by:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              )}
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="search-loading">
                <div className="loading-spinner"></div>
                <p>Searching products...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="search-results-grid">
                {searchResults.map((product, index) => (
                  <div key={index} className="search-result-card">
                    <div className="product-image-container">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="product-image"
                      />
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
            ) : (
              <div className="no-results">
                <div className="no-results-icon">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <h3>No products found</h3>
                <p>We couldn't find any products matching "{searchQuery}"</p>
                <div className="no-results-suggestions">
                  <p>Try searching for:</p>
                  <div className="suggestion-tags">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="suggestion-tag"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
