"use client";

import { useState } from "react";
import "../css/Wishlist.css";
import type { ProductModel } from "../models/ProductModel";
import { Link } from "react-router-dom";

export default function WishlistView() {
  const [wishlistItems, setWishlistItems] = useState<ProductModel[]>([
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
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const removeFromWishlist = (index: number) => {
    setWishlistItems(wishlistItems.filter((_, i) => i !== index));
  };

  const addToCart = (product: ProductModel) => {
    // Here you would typically add the item to cart
    alert(`Added ${product.title} to cart!`);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">My Wishlist</h1>
          <p className="wishlist-subtitle">
            Save your favorite items for later
          </p>
        </div>

        <div className="wishlist-content">
          {wishlistItems.length > 0 ? (
            <>
              <div className="wishlist-toolbar">
                <div className="wishlist-count">
                  {wishlistItems.length}{" "}
                  {wishlistItems.length === 1 ? "item" : "items"} in your
                  wishlist
                </div>
                <button className="clear-wishlist-btn" onClick={clearWishlist}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="3,6 5,6 21,6" />
                    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                  Clear All
                </button>
              </div>

              <div className="wishlist-grid">
                {wishlistItems.map((product, index) => (
                  <div key={index} className="wishlist-item">
                    <div className="wishlist-item-image">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                      />
                      <button
                        className="remove-btn"
                        onClick={() => removeFromWishlist(index)}
                        aria-label="Remove from wishlist"
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
                    </div>

                    <div className="wishlist-item-info">
                      <div className="item-meta">
                        <span className="item-brand">{product.brand}</span>
                        <span className="item-category">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="item-title">{product.title}</h3>
                      <div className="item-rating">
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
                      <div className="item-price">
                        <span className="current-price">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <div className="item-sizes">
                        <span className="sizes-label">Available sizes:</span>
                        <div className="sizes-list">
                          {product.size.slice(0, 4).map((size) => (
                            <span key={size} className="size-tag">
                              {size}
                            </span>
                          ))}
                          {product.size.length > 4 && (
                            <span className="size-more">
                              +{product.size.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="item-actions">
                        <button
                          className="add-to-cart-btn"
                          onClick={() => addToCart(product)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                          </svg>
                          Add to Cart
                        </button>
                        <button className="view-product-btn">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="wishlist-actions">
                <button className="add-all-to-cart-btn">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Add All to Cart
                </button>
                <Link
                  to="/shop"
                  className="continue-shopping-btn text-decoration-none"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-wishlist">
              <div className="empty-icon">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>Your wishlist is empty</h3>
              <p>
                Save items you love to your wishlist and they'll appear here.
              </p>
              <button className="start-shopping-btn text-decoration-none">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
