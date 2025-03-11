"use client";
import { useEffect, useRef, useState } from "react";
import LightGallery from "lightgallery/react";
import "@/public/css/gallery.css"; // Importa tus estilos personalizados

// Importando los estilos de LightGallery
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-rotate.css";

// Importando los plugins de LightGallery
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgRotate from "lightgallery/plugins/rotate";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  // Estado para registrar cuáles imágenes fallaron y mostrar skeleton
  const [errorImages, setErrorImages] = useState({});
  const lightboxRef = useRef(null);

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
        // Asegura que LightGallery detecte los elementos recién renderizados
        setTimeout(() => {
          if (lightboxRef.current) {
            lightboxRef.current.refresh();
          }
        }, 100);
      });

    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="gallery-container">
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
          <div className="gallery-grid">
            {images.map((image, index) => (
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
                    alt={image.alt || `Image ${index + 1}`}
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
