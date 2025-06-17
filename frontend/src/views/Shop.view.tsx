import { ProductModel } from "../models/ProductModel";
import { useMemo, useState } from "react";
import "../css/Shop.css";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  brands: string[];
  rating: number;
  search: string;
}

interface SortOption {
  value: string;
  label: string;
}

export default function ShopView() {
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

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 10000],
    sizes: [],
    colors: [],
    brands: [],
    rating: 0,
    search: "",
  });

  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions: SortOption[] = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" },
  ];

  const categories = ["Men", "Women", "Kids", "Footwear"];
  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "4-5Y",
    "6-7Y",
    "8-9Y",
    "30",
    "32",
    "34",
    "36",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];
  const colors = [
    "White",
    "Black",
    "Blue",
    "Red",
    "Pink",
    "Gray",
    "Green",
    "Yellow",
  ];
  const brands = ["FRAXON", "FITS"];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }

      // Price filter
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Size filter
      if (
        filters.sizes.length > 0 &&
        !filters.sizes.some((size) => product.size.includes(size))
      ) {
        return false;
      }

      // Color filter
      if (
        filters.colors.length > 0 &&
        !filters.colors.includes(product.color)
      ) {
        return false;
      }

      // Brand filter
      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      ) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // Search filter
      if (
        filters.search &&
        !product.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const currentArray = prev[key] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 10000],
      sizes: [],
      colors: [],
      brands: [],
      rating: 0,
      search: "",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    filters.brands.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.search ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0);

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <div className="shop-container">
          <div className="header-content">
            <div className="header-text">
              <h1 className="shop-title">Shop Collection</h1>
              <p className="shop-subtitle">
                Discover your perfect style from our curated collection
              </p>
            </div>

            <div className="header-actions">
              <div className="search-container">
                <svg
                  className="search-icon"
                  width="18"
                  height="18"
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
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-container">
        <div className="shop-content">
          {/* Filters Sidebar */}
          <aside
            className={`filters-sidebar ${showFilters ? "mobile-open" : ""}`}
          >
            <div className="filters-header">
              <h3 className="filters-title">
                Filters
                {activeFiltersCount > 0 && (
                  <span className="filters-count">({activeFiltersCount})</span>
                )}
              </h3>
              <div className="filters-actions">
                <button onClick={clearFilters} className="clear-filters">
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="close-filters mobile-only"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="filters-content">
              {/* Categories */}
              <div className="filter-group">
                <h4 className="filter-title">Categories</h4>
                <div className="filter-options">
                  {categories.map((category) => (
                    <label key={category} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() =>
                          toggleArrayFilter("categories", category)
                        }
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <h4 className="filter-title">Price Range</h4>
                <div className="price-range">
                  <div className="price-inputs">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        updateFilter("priceRange", [
                          Number(e.target.value),
                          filters.priceRange[1],
                        ])
                      }
                      className="price-input"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        updateFilter("priceRange", [
                          filters.priceRange[0],
                          Number(e.target.value),
                        ])
                      }
                      className="price-input"
                    />
                  </div>
                  <div className="price-display">
                    {formatPrice(filters.priceRange[0])} -{" "}
                    {formatPrice(filters.priceRange[1])}
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="filter-group">
                <h4 className="filter-title">Sizes</h4>
                <div className="size-options">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleArrayFilter("sizes", size)}
                      className={`size-option ${
                        filters.sizes.includes(size) ? "active" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="filter-group">
                <h4 className="filter-title">Colors</h4>
                <div className="color-options">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleArrayFilter("colors", color)}
                      className={`color-option ${
                        filters.colors.includes(color) ? "active" : ""
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    >
                      {filters.colors.includes(color) && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="filter-group">
                <h4 className="filter-title">Brands</h4>
                <div className="filter-options">
                  {brands.map((brand) => (
                    <label key={brand} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => toggleArrayFilter("brands", brand)}
                      />
                      <span className="checkmark"></span>
                      <span className="option-label">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="filter-group">
                <h4 className="filter-title">Minimum Rating</h4>
                <div className="rating-options">
                  {[4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        updateFilter(
                          "rating",
                          filters.rating === rating ? 0 : rating
                        )
                      }
                      className={`rating-option ${
                        filters.rating === rating ? "active" : ""
                      }`}
                    >
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={i < rating ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span>& Up</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="shop-main">
            {/* Toolbar */}
            <div className="shop-toolbar">
              <div className="toolbar-left">
                <button
                  onClick={() => setShowFilters(true)}
                  className="filter-toggle mobile-only"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
                  </svg>
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="filter-badge">{activeFiltersCount}</span>
                  )}
                </button>

                <div className="results-count">
                  <span>{filteredProducts.length} products found</span>
                </div>
              </div>

              <div className="toolbar-right">
                <div className="sort-container">
                  <label htmlFor="sort">Sort by:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="view-toggle">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`view-btn ${
                      viewMode === "grid" ? "active" : ""
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`view-btn ${
                      viewMode === "list" ? "active" : ""
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="active-filters">
                <span className="active-filters-label">Active filters:</span>
                <div className="filter-chips">
                  {filters.categories.map((category) => (
                    <span key={category} className="filter-chip">
                      {category}
                      <button
                        onClick={() =>
                          toggleArrayFilter("categories", category)
                        }
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {filters.sizes.map((size) => (
                    <span key={size} className="filter-chip">
                      Size: {size}
                      <button onClick={() => toggleArrayFilter("sizes", size)}>
                        ✕
                      </button>
                    </span>
                  ))}
                  {filters.colors.map((color) => (
                    <span key={color} className="filter-chip">
                      {color}
                      <button
                        onClick={() => toggleArrayFilter("colors", color)}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {filters.brands.map((brand) => (
                    <span key={brand} className="filter-chip">
                      {brand}
                      <button
                        onClick={() => toggleArrayFilter("brands", brand)}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {filters.rating > 0 && (
                    <span className="filter-chip">
                      {filters.rating}+ Stars
                      <button onClick={() => updateFilter("rating", 0)}>
                        ✕
                      </button>
                    </span>
                  )}
                  {filters.search && (
                    <span className="filter-chip">
                      "{filters.search}"
                      <button onClick={() => updateFilter("search", "")}>
                        ✕
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className={`products-container ${viewMode}`}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div key={index} className="product-card">
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
                      <div className="product-sizes">
                        {product.size.slice(0, 3).map((size) => (
                          <span key={size} className="size-tag">
                            {size}
                          </span>
                        ))}
                        {product.size.length > 3 && (
                          <span className="size-more">
                            +{product.size.length - 3}
                          </span>
                        )}
                      </div>
                      <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-products">
                  <div className="no-products-icon">
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
                  <p>Try adjusting your filters or search terms</p>
                  <button onClick={clearFilters} className="clear-filters-btn">
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div
          className="filter-overlay"
          onClick={() => setShowFilters(false)}
        ></div>
      )}
    </div>
  );
}
