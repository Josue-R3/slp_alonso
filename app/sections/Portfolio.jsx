"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// Importación de librerías y estilos
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

// Importación directa del JSON
import PortfolioData from "@/public/data/portfolio.json";

// Importación de los estilos
import "@/public/css/portfolio.css";

const Portfolio = () => {
  // Referencia para LightGallery (no causa re-renderizados cuando cambia)
  const lightGalleryRef = useRef(null);

  // Estado para los items de la galería inicializado con los datos del JSON
  const [items, setItems] = useState([]);

  // Estado para controlar si está expandido o no
  const [isExpanded, setIsExpanded] = useState(false);

  // Estado para rastrear imágenes cargadas
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allImagesReady, setAllImagesReady] = useState(false);

  // Cargar los datos al montar el componente
  useEffect(() => {
    setItems(PortfolioData);
  }, []);

  // Efecto para actualizar LightGallery cuando cambian los items
  useEffect(() => {
    if (lightGalleryRef.current && items.length > 0) {
      // Refresca LightGallery cuando los items cambian
      setTimeout(() => {
        lightGalleryRef.current.refresh();
      }, 200);
    }
  }, [items]);

  // Función para manejar carga de imágenes con useCallback para optimizar
  const handleImageLoad = useCallback(() => {
    setImagesLoaded((prev) => {
      const newCount = prev + 1;
      // Cuando se carguen todas las imágenes o el 70% de ellas
      if (newCount >= items.length * 0.7) {
        setAllImagesReady(true);
      }
      return newCount;
    });
  }, [items.length]);

  // Toggle para expandir/contraer galería con useCallback
  const toggleExpand = useCallback(() => {
    // Guardar la posición de scroll actual
    const currentScrollPos = window.scrollY;
    setIsExpanded((prev) => !prev);

    // Restaurar la posición del scroll después del cambio de estado
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScrollPos);
    });
  }, []);

  return (
    <section className="portfolio-section">
      <div
        className={`portfolio-container ${
          allImagesReady ? "images-ready" : ""
        }`}
      >
        {/* Contenedor expandible */}
        <div className={`portfolio-expandable ${isExpanded ? "expanded" : ""}`}>
          {items.length > 0 && ( // Comprueba que hay items antes de renderizar LightGallery
            <LightGallery
              ref={lightGalleryRef}
              plugins={[lgThumbnail, lgZoom]}
              speed={500}
              thumbnail={true}
              zoom={true}
              download={false}
            >
              {items.map((item, index) => (
                <a key={index} data-src={item.src} className="portfolio-item">
                  <img
                    src={item.src}
                    alt={item.title || `Portfolio item ${index + 1}`}
                    className="portfolio-image"
                    onLoad={handleImageLoad}
                  />
                </a>
              ))}
            </LightGallery>
          )}
        </div>

        {/* Overlay con botón Ver más/menos */}
        {items.length > 6 && (
          <div className="portfolio-toggle-overlay">
            <button className="portfolio-toggle-btn" onClick={toggleExpand}>
              {isExpanded ? "Ver menos" : "Ver más"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
