"use client";

import { useState, useEffect } from "react";
import "../css/FeaturedCollectionGrid.css";

export default function FeaturedCollectionGrid() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const gridElement = document.querySelector(".featured-grid-section");
    if (gridElement) {
      observer.observe(gridElement);
    }

    return () => observer.disconnect();
  }, []);

  const collections = [
    {
      id: "men",
      title: "Men",
      subtitle: "Sophisticated Style",
      description: "Discover premium menswear that defines modern masculinity",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      glowColor: "rgba(102, 126, 234, 0.4)",
    },
    {
      id: "women",
      title: "Women",
      subtitle: "Elegant Fashion",
      description: "Embrace your femininity with our curated collection",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e5?w=800&auto=format&fit=crop&q=60",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      glowColor: "rgba(240, 147, 251, 0.4)",
    },
    {
      id: "kids",
      title: "Kids",
      subtitle: "Playful & Comfortable",
      description: "Fun and durable clothing for little adventurers",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=60",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      glowColor: "rgba(79, 172, 254, 0.4)",
    },
    {
      id: "uppers",
      title: "Uppers",
      subtitle: "Statement Pieces",
      description: "Tops that make an impression",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      glowColor: "rgba(67, 233, 123, 0.4)",
    },
    {
      id: "bottoms",
      title: "Bottoms",
      subtitle: "Perfect Fit",
      description: "Comfort meets style in every piece",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      glowColor: "rgba(250, 112, 154, 0.4)",
    },
    {
      id: "footwear",
      title: "Footwear",
      subtitle: "Step Forward",
      description: "Walk with confidence and style",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      glowColor: "rgba(168, 237, 234, 0.4)",
    },
  ];

  return (
    <section className={`featured-grid-section ${isVisible ? "animate" : ""}`}>
      <div className="grid-container">
        <div className="grid-header">
          <h2 className="grid-title">Featured Collections</h2>
          <p className="grid-subtitle">
            Dare to mix and match! Check our collection to level up your fashion
            game
          </p>
        </div>

        <div className="bento-grid">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`grid-item ${collection.id} ${
                hoveredItem === collection.id ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredItem(collection.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={
                {
                  "--glow-color": collection.glowColor,
                  "--gradient": collection.gradient,
                  animationDelay: `${index * 0.1}s`,
                } as React.CSSProperties
              }
            >
              <div className="item-background">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  className="background-image"
                />
                <div className="gradient-overlay"></div>
              </div>

              <div className="item-content">
                <div className="content-main">
                  <h3 className="fg-item-title">{collection.title}</h3>
                  <p className="item-subtitle">{collection.subtitle}</p>
                </div>

                <div className="content-hover">
                  <p className="item-description">{collection.description}</p>
                </div>
              </div>

              <div className="glow-effect"></div>
              <div className="border-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
