// Gallery.jsx - Versión optimizada
'use client';

import { useRef, useState, useCallback, useEffect } from "react";
import LightGallery from "lightgallery/react";
import "@/public/css/gallery.css";

// Import LightGallery core styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

// Import LightGallery plugins - solo los esenciales
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

// Importación directa del JSON
import PortfolioData from "../../public/data/portfolio.json";

const Gallery = () => {
  // Estado único para errores de carga de imágenes
  const [errorImages, setErrorImages] = useState({});
  
  // Estado para controlar si la galería está expandida
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Estado para monitorear carga cohesionada de imágenes
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const loadedCount = useRef(0);
  
  // Referencia para LightGallery
  const lightboxRef = useRef(null);

  // Efecto para refrescar LightGallery después de montar
  useEffect(() => {
    const timer = setTimeout(() => {
      if (lightboxRef.current) lightboxRef.current.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Función para manejar carga de imágenes
  const handleImageLoad = useCallback(() => {
    loadedCount.current += 1;
    // Mostrar todo cuando el 70% está cargado
    if (loadedCount.current >= PortfolioData.length * 0.7) {
      setImagesLoaded(true);
    }
  }, []);

  // Función de expansión simplificada
  const toggleExpand = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsExpanded(prev => !prev);
    requestAnimationFrame(() => window.scrollTo(0, scrollPosition));
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        <div className={`gallery-expandable ${isExpanded ? 'expanded' : ''}`}>
          <LightGallery
            ref={lightboxRef}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            selector=".gallery-item"
            preload={2}
            thumbnail={true}
            download={false}
            mode="lg-fade"
          >
            <div className={`gallery-grid ${!isExpanded ? 'hidden-content' : ''} ${imagesLoaded ? 'images-ready' : ''}`}>
              {PortfolioData.map((image, index) => (
                <a
                  key={index}
                  href={image.src}
                  data-src={image.src}
                  className="gallery-item"
                >
                  {errorImages[index] ? (
                    <div className="skeleton"></div>
                  ) : (
                    <img
                      src={image.src}
                      loading="lazy"
                      className="gallery-image"
                      onLoad={handleImageLoad}
                      onError={() => setErrorImages(prev => ({ ...prev, [index]: true }))}
                    />
                  )}
                </a>
              ))}
            </div>
          </LightGallery>
        </div>
        
        <div className="toggle-overlay">
          <button 
            className="toggle-btn"
            onClick={toggleExpand}
          >
            {isExpanded ? 'Ver menos' : 'Ver más'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;