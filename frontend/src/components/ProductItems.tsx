"use client";

import { useState } from "react";
import "../css/ProductItem.css";
import type { ProductModel } from "../models/ProductModel";

interface Props {
  products: ProductModel[];
}

export default function ProductItems({ products }: Props) {
  const [wishlistItems, setWishlistItems] = useState<Set<number>>(
    new Set(
      products
        .map((product, index) => (product.isWishlist ? index : -1))
        .filter((i) => i !== -1)
    )
  );

  const toggleWishlist = (index: number) => {
    const newWishlist = new Set(wishlistItems);
    if (newWishlist.has(index)) {
      newWishlist.delete(index);
    } else {
      newWishlist.add(index);
    }
    setWishlistItems(newWishlist);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="products-grid">
      {products.map((product, index) => (
        <div key={index} className="product-card">
          <div className="product-image-container">
            <div className="product-image-wrapper">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="product-image"
                loading="lazy"
              />
              <div className="product-overlay">
                <button className="quick-view-btn">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Quick View
                </button>
              </div>
            </div>

            <button
              className={`wishlist-btn ${
                wishlistItems.has(index) ? "active" : ""
              }`}
              onClick={() => toggleWishlist(index)}
              aria-label={
                wishlistItems.has(index)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={wishlistItems.has(index) ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <div className="product-badge">New</div>
          </div>

          <div className="product-info">
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(product.rating)].map((_, i) => (
                    <svg
                      key={i}
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="rating-count">({product.rating})</span>
              </div>
              <div className="product-price">
                <span className="current-price">
                  {formatPrice(product.price)}
                </span>
                <span className="original-price">
                  {formatPrice(product.price + 200)}
                </span>
              </div>
            </div>

            <div className="product-actions">
              <button className="add-to-cart-btn">
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

              <div className="secondary-actions">
                <button className="action-btn" title="Compare">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="7.5,10 12,15 16.5,10" />
                  </svg>
                </button>
                <button className="action-btn" title="Share">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
