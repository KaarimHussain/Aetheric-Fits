"use client";

import type React from "react";

import { useState, useEffect } from "react";
import "../css/NewsLetter.css";

export default function NewsLetter() {
  const [phone, setPhone] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const newsletterElement = document.querySelector(".newsletter-section");
    if (newsletterElement) {
      observer.observe(newsletterElement);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubscribed(true);
    setIsLoading(false);
    setPhone("");

    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className={`newsletter-section ${isVisible ? "animate" : ""}`}>
      <div className="newsletter-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-header">
            <div className="newsletter-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Stay Connected
            </div>

            <h2 className="newsletter-title">
              Get <span className="newstitle-highlight">Instant Updates</span> via
              SMS
            </h2>

            <p className="newsletter-description">
              Be the first to know about new collections, exclusive offers, and
              flash sales. Join our SMS community and get instant notifications
              plus 10% off your first order.
            </p>
          </div>

          <div className="newsletter-form-container">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="input-group">
                  <div className="input-wrapper">
                    <svg
                      className="input-icon"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="phone-input"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="subscribe-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7,7 17,7 17,17" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="success-message">
                <div className="success-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22,4 12,14.01 9,11.01" />
                  </svg>
                </div>
                <h3>Welcome to FRAXON FITS!</h3>
                <p>
                  You'll receive a confirmation SMS with your exclusive 10%
                  discount code.
                </p>
              </div>
            )}

            <div className="newsletter-features">
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <span>Instant flash sale alerts</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <span>New arrival notifications</span>
              </div>
              <div className="feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <span>No spam, opt-out anytime</span>
              </div>
            </div>
          </div>
        </div>

        <div className="newsletter-stats">
          <div className="stat">
            <span className="news-stat-number">25K+</span>
            <span className="news-stat-label">Subscribers</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="news-stat-number">4.9★</span>
            <span className="news-stat-label">Rating</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="news-stat-number">Weekly</span>
            <span className="news-stat-label">Updates</span>
          </div>
        </div>
      </div>
    </section>
  );
}
