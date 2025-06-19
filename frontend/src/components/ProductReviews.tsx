"use client";

import type React from "react";
import { useState } from "react";

interface Review {
  id: string;
  userName: string;
  userInitial: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
  images?: string[];
  isHelpful?: boolean;
}

interface ProductReviewsProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  averageRating,
  totalReviews,
}) => {
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Sarah Johnson",
      userInitial: "S",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely love this hoodie! The quality is exceptional and the fit is perfect. The fabric is so soft and comfortable, I've been wearing it almost every day since I got it. Highly recommend!",
      verified: true,
      helpful: 12,
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&auto=format&fit=crop&q=60",
      ],
    },
    {
      id: "2",
      userName: "Mike Rodriguez",
      userInitial: "M",
      rating: 4,
      date: "2024-01-10",
      comment:
        "Great hoodie overall. The quality is good and it's very comfortable. Only reason I'm not giving 5 stars is because I wish it came in more color options. But definitely worth the purchase!",
      verified: true,
      helpful: 8,
    },
    {
      id: "3",
      userName: "Emma Chen",
      userInitial: "E",
      rating: 5,
      date: "2024-01-08",
      comment:
        "Perfect oversized fit! Exactly what I was looking for. The material feels premium and the stitching is excellent. AETHERIC FITS really knows how to make quality clothing.",
      verified: false,
      helpful: 15,
    },
    {
      id: "4",
      userName: "David Thompson",
      userInitial: "D",
      rating: 4,
      date: "2024-01-05",
      comment:
        "Good quality hoodie. Fits as expected and the material is nice. Fast shipping too!",
      verified: true,
      helpful: 5,
    },
  ]);

  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [newReview, setNewReview] = useState({
    rating: 0,
    name: "",
    comment: "",
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  const filteredReviews = reviews.filter((review) =>
    filterRating ? review.rating === filterRating : true
  );

  const renderStars = (rating: number, size = "16px") => {
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`bi ${index < rating ? "bi-star-fill" : "bi-star"}`}
        style={{
          color: index < rating ? "#ffc107" : "#e9ecef",
          fontSize: size,
        }}
      ></i>
    ));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.name || !newReview.comment) {
      alert("Please fill in all fields and select a rating");
      return;
    }
    console.log("New review submitted:", newReview);
    // Reset form
    setNewReview({ rating: 0, name: "", comment: "" });
  };

  return (
    <div className="reviews-section">
      <div className="container">
        <div className="reviews-header">
          <h2 className="reviews-title">Customer Reviews</h2>
          <p className="reviews-subtitle">
            See what our customers are saying about this product
          </p>
        </div>

        {/* Reviews Summary */}
        <div className="reviews-summary">
          <div className="rating-overview">
            <div className="average-rating">{averageRating.toFixed(1)}</div>
            <div className="rating-stars-large">
              {renderStars(Math.floor(averageRating), "24px")}
            </div>
            <div className="total-reviews-text">
              Based on {totalReviews} reviews
            </div>
          </div>

          <div className="rating-breakdown">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="rating-bar">
                <span className="rating-label">{rating} stars</span>
                <div className="rating-progress">
                  <div
                    className="rating-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="rating-count">({count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Controls */}
        <div className="reviews-controls">
          <div className="reviews-filter">
            <button
              className={`filter-btn ${filterRating === null ? "active" : ""}`}
              onClick={() => setFilterRating(null)}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                className={`filter-btn ${
                  filterRating === rating ? "active" : ""
                }`}
                onClick={() => setFilterRating(rating)}
              >
                {rating}{" "}
                <i
                  className="bi bi-star-fill"
                  style={{ color: "#ffc107", fontSize: "12px" }}
                ></i>
              </button>
            ))}
          </div>

          <select
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          {filteredReviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">{review.userInitial}</div>
                  <div className="reviewer-details">
                    <h4>{review.userName}</h4>
                    {review.verified && (
                      <span className="verified-badge">Verified Purchase</span>
                    )}
                  </div>
                </div>
                <div className="review-meta">
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <div className="review-date">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="review-content">
                <p>{review.comment}</p>
              </div>

              {review.images && (
                <div className="review-images">
                  {review.images.map((image, index) => (
                    <div key={index} className="review-image">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Review ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="review-actions">
                <div className="review-helpful">
                  <button
                    className={`helpful-btn ${
                      review.isHelpful ? "active" : ""
                    }`}
                  >
                    <i className="bi bi-hand-thumbs-up"></i>
                    Helpful ({review.helpful})
                  </button>
                  <button className="helpful-btn">
                    <i className="bi bi-hand-thumbs-down"></i>
                    Not Helpful
                  </button>
                </div>
                <button className="review-reply-btn">Reply</button>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Section */}
        <div className="write-review-section">
          <h3 className="write-review-title">Write a Review</h3>
          <form className="review-form" onSubmit={handleSubmitReview}>
            <div className="form-group">
              <label>Rating *</label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`rating-star bi ${
                      star <= newReview.rating ? "bi-star-fill" : "bi-star"
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  ></i>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reviewName">Name *</label>
              <input
                type="text"
                id="reviewName"
                className="form-input"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reviewComment">Review *</label>
              <textarea
                id="reviewComment"
                className="form-textarea"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                placeholder="Share your experience with this product..."
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
