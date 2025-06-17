"use client";

import { useState, useEffect } from "react";
import "../css/Banner.css";

export default function BannerSection() {
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

    const bannerElement = document.querySelector(".banner-section");
    if (bannerElement) {
      observer.observe(bannerElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`banner-section ${isVisible ? "animate" : ""}`}>
      <div className="banner-container">
        <div className="banner-content">
          {/* Left Content */}
          <div className="banner-text">
            <div className="banner-badge">
              <span className="badge-icon">✨</span>
              Limited Time Offer
            </div>

            <h2 className="banner-title">
              Find Your Perfect Look at{" "}
              <span className="brand-highlight">
                <span className="fs-2 dark-logo-text">AETHERIC</span>{" "}
                <span className="fs-2 dark-logo-accent">FITS</span>
              </span>
              <br />
              <span className="location-text">New In Pakistan</span>
            </h2>

            <p className="banner-description">
              Discover premium fashion that defines your unique style. From
              timeless classics to contemporary trends, we bring you the finest
              collection of clothing that speaks to your personality and
              elevates your wardrobe.
            </p>

            <div className="banner-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <span>Premium Quality</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span>Fast Delivery</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <span>Easy Returns</span>
              </div>
            </div>

            <div className="sale-section">
              <div className="sale-content">
                <div className="sale-text">
                  <h3 className="sale-title">Come and Enjoy the Sale!</h3>
                  <div className="sale-details">
                    <span className="sale-label">Up to</span>
                    <span className="sale-percentage">50%</span>
                    <span className="sale-off">OFF</span>
                  </div>
                </div>

                <div className="countdown-timer">
                  <div className="timer-item">
                    <span className="timer-number">02</span>
                    <span className="timer-label">Days</span>
                  </div>
                  <div className="timer-separator">:</div>
                  <div className="timer-item">
                    <span className="timer-number">14</span>
                    <span className="timer-label">Hours</span>
                  </div>
                  <div className="timer-separator">:</div>
                  <div className="timer-item">
                    <span className="timer-number">32</span>
                    <span className="timer-label">Mins</span>
                  </div>
                </div>
              </div>

              <button className="cta-button">
                <span className="button-text">Shop Now</span>
                <div className="button-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7,7 17,7 17,17" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="banner-image">
            <div className="image-container">
              <img
                src="https://images.unsplash.com/photo-1595147389795-37094173bfd8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Fashion Collection"
                className="main-image"
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <span className="overlay-text">
                    New Collection 2025 - 2026
                  </span>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="floating-element element-1">
                <div className="floating-card">
                  <span className="card-text">Premium</span>
                  <span className="card-subtext">Quality</span>
                </div>
              </div>

              <div className="floating-element element-2">
                <div className="floating-card">
                  <span className="card-text">Free</span>
                  <span className="card-subtext">Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
