"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import PortfolioData from "@/public/data/portfolio.json";
import "@/public/css/portfolio.css";

const Portfolio = () => {
  const lightGalleryRef = useRef(null);
  const [items, setItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allImagesReady, setAllImagesReady] = useState(false);

  useEffect(() => {
    setItems(PortfolioData);
  }, []);

  useEffect(() => {
    if (lightGalleryRef.current && items.length > 0) {
      setTimeout(() => {
        lightGalleryRef.current.refresh();
      }, 200);
    }
  }, [items]);

  const handleImageLoad = useCallback(() => {
    setImagesLoaded((prev) => {
      const newCount = prev + 1;
      if (newCount >= items.length * 0.7) {
        setAllImagesReady(true);
      }
      return newCount;
    });
  }, [items.length]);

  const toggleExpand = useCallback(() => {
    const currentScrollPos = window.scrollY;
    setIsExpanded((prev) => !prev);
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScrollPos);
    });
  }, []);

  return (
    <section className="portfolio-section">
      <div className="portfolio-gallery">
        {items.length > 0 && (
          <LightGallery
            ref={lightGalleryRef}
            plugins={[lgThumbnail, lgZoom]}
            speed={500}
            thumbnail={true}
            zoom={true}
            download={false}
            hideScrollbar={true}
          >
            {items.map((item, index) => (
              <a key={index} data-src={item.src} className="portfolio-item">
                <img
                  src={item.src}
                  alt={item.title || `Portfolio item ${index + 1}`}
                  className="portfolio-image"
                  onLoad={handleImageLoad}
                  loading="lazy"
                />
              </a>
            ))}
          </LightGallery>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
