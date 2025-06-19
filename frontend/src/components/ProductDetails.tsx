import React, { useState } from "react";
import type { ProductModel } from "../models/ProductModel";
import "../css/ProductDetails.css";
import ProductReviews from "./ProductReviews";

interface ProductDetailsProps {
  product: ProductModel;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(product.color);
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlist, setIsWishlist] = useState<boolean>(product.isWishlist);

  const productImages = product.images || [
    product.image,
    product.image,
    product.image,
    product.image,
  ];
  const availableColors = product.colors || [
    product.color,
    "Black",
    "Navy",
    "Gray",
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    console.log("Added to cart:", {
      product,
      selectedSize,
      selectedColor,
      quantity,
    });
  };

  const handleWishlistToggle = () => {
    setIsWishlist(!isWishlist);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`bi ${index < rating ? "bi-star-fill" : "bi-star"}`}
        style={{ color: index < rating ? "#ffc107" : "#e9ecef" }}
      ></i>
    ));
  };

  return (
    <div className="product-details-container pt-5">
      <div className="container">
        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6 col-md-12">
            <div className="product-images-section">
              <div className="main-image-container">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt={product.title}
                  className="main-product-image"
                />
                <button
                  className={`wishlist-btn ${isWishlist ? "active" : ""}`}
                  onClick={handleWishlistToggle}
                >
                  <i
                    className={`bi ${
                      isWishlist ? "bi-heart-fill" : "bi-heart"
                    }`}
                  ></i>
                </button>
              </div>

              <div className="thumbnail-images">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-item ${
                      selectedImage === image ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="col-lg-6 col-md-12">
            <div className="product-info-section">
              <h1 className="pd-product-title">{product.title}</h1>

              <div className="product-rating">
                <div className="stars">{renderStars(product.rating)}</div>
                <span className="rating-text">
                  {product.rating}.0 ({product.reviews} reviews)
                </span>
              </div>

              <div className="pd-product-price">
                <span className="pd-current-price">${product.price}</span>
                {product.originalPrice && (
                  <span className="pd-original-price">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <div className="product-description">
                <p>
                  {product.description ||
                    "Experience premium quality and contemporary style with this carefully crafted piece. Made from the finest materials and designed for the modern individual who values both comfort and sophistication."}
                </p>
              </div>

              {/* Color Selection */}
              <div className="product-options">
                <div className="option-group">
                  <label className="option-label">
                    Color:{" "}
                    <span className="selected-option">{selectedColor}</span>
                  </label>
                  <div className="color-options">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        className={`color-option ${
                          selectedColor === color ? "active" : ""
                        }`}
                        onClick={() => setSelectedColor(color)}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      >
                        {selectedColor === color && (
                          <i className="bi bi-check"></i>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="option-group">
                  <label className="option-label">
                    Size:{" "}
                    <span className="selected-option">
                      {selectedSize || "Select Size"}
                    </span>
                  </label>
                  <div className="size-options">
                    {product.size.map((size) => (
                      <button
                        key={size}
                        className={`size-option ${
                          selectedSize === size ? "active" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="option-group">
                  <label className="option-label">Quantity:</label>
                  <div className="quantity-selector">
                    <button
                      className="quantity-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-actions">
                <button
                  className="btn-primary add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                  <i className="bi bi-bag-plus"></i>
                </button>
                <button className="btn-secondary buy-now-btn">
                  Buy Now
                  <i className="bi bi-lightning"></i>
                </button>
              </div>

              {/* Product Features */}
              <div className="product-features">
                <div className="feature-item">
                  <i className="bi bi-truck"></i>
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-arrow-clockwise"></i>
                  <span>30-day return policy</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-shield-check"></i>
                  <span>2-year warranty included</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="product-details-accordion">
                <div className="accordion" id="productAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseDetails"
                      >
                        Product Details
                      </button>
                    </h2>
                    <div
                      id="collapseDetails"
                      className="accordion-collapse collapse show"
                    >
                      <div className="accordion-body">
                        <ul>
                          <li>
                            SKU:{" "}
                            {product.sku ||
                              "AF-" +
                                Math.random()
                                  .toString(36)
                                  .substr(2, 9)
                                  .toUpperCase()}
                          </li>
                          <li>Material: Premium Cotton Blend</li>
                          <li>Care: Machine wash cold, tumble dry low</li>
                          <li>Origin: Designed in USA</li>
                          <li>Fit: Regular fit with modern silhouette</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Reviews Section */}
        <ProductReviews
          productId={product.id || "1"}
          averageRating={product.rating}
          totalReviews={product.reviews}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
