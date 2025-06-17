"use client";

import { useState } from "react";
import "../css/Footer.css";

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="brand-logo">
                <img
                  src="/logo/LOGO-Black.png"
                  alt="AETHERIC FITS Logo"
                  className="footer-logo"
                  width={150}
                />
              </div>
              <p className="brand-description">
                Defining style, one outfit at a time. Discover premium fashion
                that speaks to your unique personality and elevates your
                wardrobe.
              </p>
              <div className="social-links">
                {[
                  {
                    name: "instagram",
                    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                  },
                  {
                    name: "twitter",
                    icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
                  },
                  {
                    name: "facebook",
                    icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className={`social-link ${
                      hoveredSocial === social.name ? "hovered" : ""
                    }`}
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    aria-label={social.name}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-section-title">Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <a href="#">New Arrivals</a>
                </li>
                <li>
                  <a href="#">Best Sellers</a>
                </li>
                <li>
                  <a href="#">Sale</a>
                </li>
                <li>
                  <a href="#">Collections</a>
                </li>
                <li>
                  <a href="#">Gift Cards</a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-section">
              <h3 className="footer-section-title">Categories</h3>
              <ul className="footer-links">
                <li>
                  <a href="#">Men's Fashion</a>
                </li>
                <li>
                  <a href="#">Women's Fashion</a>
                </li>
                <li>
                  <a href="#">Kids' Clothing</a>
                </li>
                <li>
                  <a href="#">Accessories</a>
                </li>
                <li>
                  <a href="#">Footwear</a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-section">
              <h3 className="footer-section-title">Customer Service</h3>
              <ul className="footer-links">
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Size Guide</a>
                </li>
                <li>
                  <a href="#">Shipping Info</a>
                </li>
                <li>
                  <a href="#">Returns & Exchanges</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3 className="footer-section-title">Get in Touch</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Karachi, Pakistan</span>
                </div>
                <div className="contact-item">
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
                  <span>+92 300 1234567</span>
                </div>
                <div className="contact-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>hello@fraxonfits.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} FRAXON FITS. All rights reserved.</p>
            </div>

            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>

            <div className="payment-methods">
              <span className="payment-label">We Accept:</span>
              <div className="payment-icons">
                {["Visa", "MC", "PayPal", "GPay"].map((method) => (
                  <div key={method} className="payment-icon">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
