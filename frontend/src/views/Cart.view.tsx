"use client";

import { useState } from "react";
import "../css/Cart.css";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  brand: string;
  inStock: boolean;
}

export default function CartView() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "CART-1",
      name: "Premium Cotton T-Shirt",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60",
      price: 2500,
      quantity: 2,
      size: "M",
      color: "White",
      brand: "FRAXON",
      inStock: true,
    },
    {
      id: "CART-2",
      name: "Classic Denim Jeans",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60",
      price: 3500,
      quantity: 1,
      size: "32",
      color: "Blue",
      brand: "FRAXON",
      inStock: true,
    },
    {
      id: "CART-3",
      name: "Casual Sneakers",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=60",
      price: 5500,
      quantity: 1,
      size: "9",
      color: "White",
      brand: "FITS",
      inStock: false,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const moveToWishlist = (id: string) => {
    // Here you would typically move the item to wishlist
    removeItem(id);
    alert("Item moved to wishlist!");
  };

  const applyPromoCode = () => {
    // Mock promo code validation
    const validCodes = {
      SAVE10: 10,
      WELCOME15: 15,
      FRAXON20: 20,
    };

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo({
        code: promoCode,
        discount: validCodes[promoCode as keyof typeof validCodes],
      });
      setPromoCode("");
    } else {
      alert("Invalid promo code");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 5000 ? 0 : 300;
  const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const total = subtotal + shipping - discount;

  const handleCheckout = () => {
    // Here you would typically redirect to checkout
    alert("Proceeding to checkout...");
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">Review your items before checkout</p>
        </div>

        <div className="cart-content">
          {cartItems.length > 0 ? (
            <div className="cart-layout">
              {/* Cart Items */}
              <div className="cart-items-section">
                <div className="cart-items-header">
                  <h2>Your Items ({cartItems.length})</h2>
                  <button
                    className="clear-cart-btn"
                    onClick={() => setCartItems([])}
                  >
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
                    </svg>
                    Clear Cart
                  </button>
                </div>

                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className={`cart-item ${
                        !item.inStock ? "out-of-stock" : ""
                      }`}
                    >
                      <div className="item-image">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                        />
                        {!item.inStock && (
                          <div className="stock-overlay">Out of Stock</div>
                        )}
                      </div>

                      <div className="item-details">
                        <div className="item-info">
                          <h3 className="item-name">{item.name}</h3>
                          <div className="item-meta">
                            <span className="item-brand">{item.brand}</span>
                            <span className="item-specs">
                              Size: {item.size} • Color: {item.color}
                            </span>
                          </div>
                          {!item.inStock && (
                            <div className="stock-warning">
                              This item is currently out of stock
                            </div>
                          )}
                        </div>

                        <div className="item-actions">
                          <button
                            className="action-btn"
                            onClick={() => moveToWishlist(item.id)}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            Move to Wishlist
                          </button>
                          <button
                            className="action-btn remove"
                            onClick={() => removeItem(item.id)}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="3,6 5,6 21,6" />
                              <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="item-quantity">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={!item.inStock}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                          <span className="quantity-value">
                            {item.quantity}
                          </span>
                          <button
                            className="quantity-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={!item.inStock}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="item-price">
                        <div className="price-per-item">
                          {formatPrice(item.price)}
                        </div>
                        <div className="price-total">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="continue-shopping">
                  <button className="continue-shopping-btn">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 12H5" />
                      <path d="M12 19l-7-7 7-7" />
                    </svg>
                    Continue Shopping
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary-section">
                <div className="order-summary">
                  <h3 className="summary-title">Order Summary</h3>

                  <div className="summary-details">
                    <div className="summary-line">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="summary-line">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    {appliedPromo && (
                      <div className="summary-line discount">
                        <span>
                          Discount ({appliedPromo.code})
                          <button
                            className="remove-promo"
                            onClick={removePromoCode}
                          >
                            ×
                          </button>
                        </span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="summary-divider"></div>
                    <div className="summary-line total">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="promo-section">
                    <div className="promo-input-group">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) =>
                          setPromoCode(e.target.value.toUpperCase())
                        }
                        className="promo-input"
                      />
                      <button
                        className="apply-promo-btn"
                        onClick={applyPromoCode}
                        disabled={!promoCode}
                      >
                        Apply
                      </button>
                    </div>
                    <div className="promo-suggestions">
                      <p>Try: SAVE10, WELCOME15, FRAXON20</p>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="shipping-info">
                    <div className="shipping-benefit">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16,8 20,8 23,11 23,16 16,16" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                      {shipping === 0 ? (
                        <span>Free shipping on your order!</span>
                      ) : (
                        <span>
                          Add {formatPrice(5000 - subtotal)} more for free
                          shipping
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="checkout-btn" onClick={handleCheckout}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <circle cx="12" cy="16" r="1" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Secure Checkout
                  </button>

                  {/* Security Info */}
                  <div className="security-info">
                    <div className="security-badges">
                      <div className="security-badge">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="12" cy="16" r="1" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>Secure Payment</span>
                      </div>
                      <div className="security-badge">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 12l2 2 4-4" />
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                        <span>Easy Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <div className="empty-icon">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3>Your cart is empty</h3>
              <p>Add some items to your cart to get started.</p>
              <button className="start-shopping-btn">
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
