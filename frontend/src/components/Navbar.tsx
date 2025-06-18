"use client";

import { useState, useEffect } from "react";
import "../css/Navbar.css";
import { AuthService } from "../service/auth.module.service";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const authService = new AuthService();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authService.isLoggedIn());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "unset";
  };

  const handleLogin = () => {
    // Mock login - replace with your actual login logic
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Mock logout - replace with your actual logout logic
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo">
            <Link to="/">
              <img
                src="./logo/LOGO-White.png"
                height={50}
                width={100}
                className="object-fit-cover object-position-center"
                alt=""
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-menu">
            <Link to="/collection" className="nav-item">
              <span>Collection</span>
              <div className="nav-dot"></div>
            </Link>
            <Link to="/shop" className="nav-item">
              <span>Shop</span>
              <div className="nav-dot"></div>
            </Link>
            <Link to="/about" className="nav-item">
              <span>About</span>
              <div className="nav-dot"></div>
            </Link>
            <Link to="/contact" className="nav-item">
              <span>Contact</span>
              <div className="nav-dot"></div>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="nav-actions">
            {/* Search */}
            <button
              className="search-btn"
              aria-label="Search"
              onClick={handleSearchClick}
            >
              <svg
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
            </button>

            {isLoggedIn ? (
              <>
                <button
                  className="cart-btn"
                  aria-label="Shopping cart"
                  onClick={handleCartClick}
                >
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
                  <span className="cart-badge">3</span>
                </button>

                <div className="nav-divider"></div>

                <div className="account-dropdown">
                  <button className="account-btn" aria-label="Account">
                    <div className="account-avatar">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  </button>
                  <div className="account-dropdown-menu">
                    <Link to="/profile" className="dropdown-item">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Profile
                    </Link>
                    <Link to="/orders" className="dropdown-item">
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
                      Orders
                    </Link>
                    <Link to="/wishlist" className="dropdown-item">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      Wishlist
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item logout-btn"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16,17 21,12 16,7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="login-btn">
                  Login
                </Link>
                <Link to="/signup" className="signup-btn">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className={`mobile-toggle ${isMobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-content">
            <div className="mobile-nav">
              <Link to="/collection" onClick={toggleMobileMenu}>
                <span>Collection</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </Link>
              <Link to="/shop" onClick={toggleMobileMenu}>
                <span>Shop</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </Link>
              <Link to="/about" onClick={toggleMobileMenu}>
                <span>About</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </Link>
              <Link to="/contact" onClick={toggleMobileMenu}>
                <span>Contact</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </Link>
            </div>

            <div className="mobile-bottom">
              {isLoggedIn ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <div className="mobile-avatar">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span>Welcome back!</span>
                  </div>
                  <div className="mobile-user-actions">
                    <Link to="/profile" onClick={toggleMobileMenu}>
                      Profile
                    </Link>
                    <Link to="/orders" onClick={toggleMobileMenu}>
                      Orders
                    </Link>
                    <Link to="/wishlist" onClick={toggleMobileMenu}>
                      Wishlist
                    </Link>
                    <Link to="/cart" onClick={toggleMobileMenu}>
                      Cart (3)
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                      className="mobile-logout"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mobile-actions">
                  <Link to="/login" onClick={toggleMobileMenu}>
                    <button>Login</button>
                  </Link>
                  <Link to="/signup" onClick={toggleMobileMenu}>
                    <button>Sign Up</button>
                  </Link>
                </div>
              )}

              <div className="mobile-social">
                <span>Follow us</span>
                <div className="social-links">
                  <a href="#">IG</a>
                  <a href="#">TW</a>
                  <a href="#">FB</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}></div>
      )}
    </>
  );
}
