// Gallery.jsx
'use client';

import { useEffect, useRef, useState, useCallback } from "react";
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
  
  // Estado para controlar si la galería está expandida
  const [isExpanded, setIsExpanded] = useState(false);
  const collapsedHeight = 800; // Altura cuando está colapsado
  
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
        //console.log("Images loaded successfully", data);
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

  // Memorizar función para evitar re-renders
  const toggleExpand = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsExpanded(!isExpanded);
    
    requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
  }, [isExpanded]);

  return (
    <div className="gallery-container">
      {images.length === 0 ? (
        <p className="no-images-message">No images found. Check the JSON file.</p>
      ) : (
        <div className="gallery-wrapper">
          <div 
            className={`gallery-expandable ${isExpanded ? 'expanded' : 'collapsed'}`}
          >
            <LightGallery
              ref={lightboxRef}
              speed={500}
              plugins={[lgThumbnail, lgZoom, lgRotate]}
              selector=".gallery-item"
              elementClassNames="w-full"
            >
              <div className={`gallery-grid ${isExpanded ? '' : 'hidden-content'}`}>
                {images.map((image, index) => (
                  <a
                    key={index}
                    href={image.src}
                    data-src={image.src}
                    data-sub-html=""
                    className="gallery-item"
                  >
                    {errorImages[index] ? (
                      <div className="skeleton"></div>
                    ) : (
                      <img
                        src={image.src}
                        loading="lazy" // Agregar esto para lazy loading nativo
                        className="gallery-image"
                        onError={(e) => {
                          setErrorImages((prev) => ({ ...prev, [index]: true }));
                        }}
                      />
                    )}
                  </a>
                ))}
              </div>
            </LightGallery>
          </div>
          
          <div 
            className={`toggle-overlay ${isExpanded ? 'expanded' : ''}`}
          >
            <button 
              className="toggle-btn"
              onClick={toggleExpand}
            >
              {isExpanded ? 'Ver menos' : 'Ver más'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;