"use client";

import { useEffect, useRef, useState } from "react";
import LightGallery from "lightgallery/react";
import "@/public/css/gallery.css";

// Import LightGallery core styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-rotate.css";

// Import LightGallery plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgRotate from "lightgallery/plugins/rotate";

const Gallery = () => {
  // Stores images loaded from JSON
  const [images, setImages] = useState([]);
  // Loading state while fetching JSON
  const [loading, setLoading] = useState(true);
  // Tracks which images failed to load and need skeleton
  const [errorImages, setErrorImages] = useState({});

  // Ref for the LightGallery instance
  const lightboxRef = useRef(null);

  // Fetch image data from public/data/portfolio.json
  useEffect(() => {
    console.log("Fetching images...");

    fetch("/data/portfolio.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load JSON: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid JSON format. Expected an array.");
        }
        console.log("Images loaded successfully", data);
        setImages(data);
      })
      .catch((error) => console.error("Error loading images:", error))
      .finally(() => {
        setLoading(false);
        // Ensures LightGallery is refreshed once images are rendered
        setTimeout(() => {
          if (lightboxRef.current) {
            lightboxRef.current.refresh();
          }
        }, 100);
      });

    // Clean up the LightGallery instance when component unmounts
    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="gallery-container">
      {/* If no images available show message */}
      {images.length === 0 ? (
        <p className="no-images-message">
          No images found. Check the JSON file.
        </p>
      ) : (
        <LightGallery
          ref={lightboxRef}
          speed={500}
          plugins={[lgThumbnail, lgZoom, lgRotate]}
          selector=".gallery-item"
        >
          {/* Gallery grid container */}
          <div className="gallery-grid">
            {images.map((image, index) => (
              // Main wrapper for each image
              <a
                key={index}
                href={image.src}
                data-src={image.src} // Required for LightGallery
                data-sub-html="" // Prevents showing any title/alt in overlay
                className="gallery-item"
              >
                {errorImages[index] ? (
                  // Skeleton shown if image fails to load
                  <div className="skeleton"></div>
                ) : (
                  <img
                    src={image.src}
                    className="gallery-image"
                    onError={(e) => {
                      console.error(`Error loading image: ${e.target.src}`);
                      setErrorImages((prev) => ({ ...prev, [index]: true }));
                    }}
                  />
                )}
              </a>
            ))}
          </div>
        </LightGallery>
      )}
    </div>
  );
};

export default Gallery;
