"use client";

import { useState, useEffect } from "react";
import "../css/About.css";
import { Link } from "react-router-dom";

export default function AboutView() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const aboutElement = document.querySelector(".about-hero");
    if (aboutElement) {
      observer.observe(aboutElement);
    }

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Muhammad Ghufran",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e5?w=400&auto=format&fit=crop&q=60",
      bio: "With over 10 years in fashion, Ghufran founded AETHERIC FITS to make premium fashion accessible to everyone.",
    },
    {
      name: "Junaid Sheikh",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
      bio: "Junaid brings his passion for design and innovation to create collections that define modern style.",
    },
    {
      name: "Shezal Sheikh",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
      bio: "Shezal ensures every order is fulfilled with care and reaches our customers in perfect condition.",
    },
    {
      name: "Kaarim Hussain",
      role: "Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
      bio: "Kaarim develops the website and ensures it runs smoothly and efficiently.",
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "The Beginning",
      description:
        "AETHERIC FITS was founded with a vision to revolutionize fashion in Pakistan.",
    },
    {
      year: "2022",
      title: "First Collection",
      description:
        "Launched our debut collection featuring premium cotton essentials.",
    },
    {
      year: "2023",
      title: "Expansion",
      description: "Expanded to include women's and children's fashion lines.",
    },
    {
      year: "2024",
      title: "Going Digital",
      description:
        "Launched our e-commerce platform to reach customers nationwide.",
    },
    {
      year: "2025",
      title: "Sustainable Future",
      description:
        "Committed to sustainable fashion practices and eco-friendly materials.",
    },
  ];

  const values = [
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: "Quality First",
      description:
        "We never compromise on quality. Every piece is crafted with attention to detail and premium materials.",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: "Customer Centric",
      description:
        "Our customers are at the heart of everything we do. Your satisfaction is our top priority.",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: "Innovation",
      description:
        "We constantly innovate to bring you the latest trends and timeless pieces that define style.",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: "Sustainability",
      description:
        "We're committed to sustainable practices that protect our planet for future generations.",
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className={`about-hero ${isVisible ? "animate" : ""}`}>
        <div className="hero-background">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>

        <div className="about-container">
          <div className="hero-content">
            <div className="hero-badge">✨ Our Story</div>
            <h1 className="hero-title">
              Defining Style,
              <span className="title-highlight"> One Outfit </span>
              at a Time
            </h1>
            <p className="hero-subtitle">
              At AETHERIC FITS, we believe fashion is more than clothing—it's a
              form of self-expression. Since 2020, we've been crafting premium
              fashion that empowers individuals to showcase their unique style
              with confidence.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Products Sold</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">Customer Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-container">
        {/* Mission Section */}
        <section className="mission-section">
          <div className="section-content">
            <div className="mission-grid">
              <div className="mission-text">
                <h2 className="section-title">Our Mission</h2>
                <p className="mission-description">
                  To make premium fashion accessible to everyone while
                  maintaining the highest standards of quality and style. We
                  strive to create clothing that not only looks good but makes
                  you feel confident and empowered.
                </p>
                <div className="mission-points">
                  <div className="mission-point">
                    <div className="point-icon">
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
                    <span>Premium quality materials and craftsmanship</span>
                  </div>
                  <div className="mission-point">
                    <div className="point-icon">
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
                    <span>Affordable pricing without compromising quality</span>
                  </div>
                  <div className="mission-point">
                    <div className="point-icon">
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
                    <span>Sustainable and ethical fashion practices</span>
                  </div>
                </div>
              </div>
              <div className="mission-image">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=60"
                  alt="Our Mission"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values-section px-5 py-5">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="timeline-section">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">Milestones that shaped our story</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-year">{milestone.year}</div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-description">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate people behind FRAXON FITS
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                  />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section mb-4">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Define Your Style?</h2>
            <p className="cta-description">
              Join thousands of satisfied customers who trust FRAXON FITS for
              their fashion needs.
            </p>
            <div className="cta-buttons">
              <Link to="/shop" className="cta-primary">
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
                Shop Now
              </Link>
              <Link to="/contact" className="cta-secondary">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
