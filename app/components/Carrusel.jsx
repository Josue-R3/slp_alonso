"use client";

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "@/public/css/carrusel.css";

export default function Carrusel() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/data/carrusel.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load slider.json");
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid format: slider.json should be an array");
        }
        setWorks(data);
      })
      .catch((err) => console.error("Error fetching slider data:", err))
      .finally(() => setLoading(false));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? works.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= works.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carrusel-wrapper">
      <div className="carrusel-container">
        <div className="carrusel-grid">
          <div className="carrusel-text">
            <h2 className="carrusel-title">Audiovisuales</h2>

            {loading ? (
              <>
                <div className="carrusel-skeleton-base h-4 w-full mb-2"></div>
                <div className="carrusel-skeleton-base h-4 w-11/12 mb-2"></div>
                <div className="carrusel-skeleton-base h-4 w-10/12 mb-2"></div>
                <div className="carrusel-skeleton-base h-4 w-9/12 mb-6"></div>
              </>
            ) : (
              <p className="carrusel-description">
                Pendiente mejorar el carrusel y la reproducción automática de
                video.
              </p>
            )}

            <div className="carrusel-buttons">
              <button
                onClick={handlePrev}
                disabled={loading || works.length < 1}
                className="carrusel-button"
              >
                <ChevronLeftIcon className="icon" />
              </button>
              <button
                onClick={handleNext}
                disabled={loading || works.length < 1}
                className="carrusel-button"
              >
                <ChevronRightIcon className="icon" />
              </button>
            </div>
          </div>

          <div className="carrusel-slides">
            <div className="carrusel-track">
              {(loading ? Array(3).fill(0) : works)
                .slice(currentIndex, currentIndex + 3)
                .map((work, index) => (
                  <div key={index} className="carrusel-card">
                    {loading ? (
                      <div className="carrusel-skeleton"></div>
                    ) : (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="carrusel-video"
                        src={work.src}
                      ></video>
                    )}
                  </div>
                ))}
            </div>

            {!loading && works.length > 0 && (
              <div className="carrusel-indicators">
                {Array.from({ length: Math.max(1, works.length - 2) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      className={`carrusel-indicator ${
                        index === currentIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
