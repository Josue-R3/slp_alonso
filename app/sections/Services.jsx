"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/public/css/services.css";

import CarruselData from "../../public/data/carrusel.json";

export default function ServicesCarousel() {
  const carouselRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(300);
  const [animationDuration, setAnimationDuration] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Usar los datos del carrusel y duplicarlos para el loop
  const duplicatedServices = [
    ...CarruselData,
    ...CarruselData,
    ...CarruselData,
  ];

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const containerWidth =
          (carouselRef.current.parentElement &&
            carouselRef.current.parentElement.clientWidth) ||
          window.innerWidth;

        let newCardWidth = 300;

        if (window.innerWidth < 640) {
          newCardWidth = containerWidth * 0.8;
        } else if (window.innerWidth < 1024) {
          newCardWidth = containerWidth * 0.4;
        } else {
          newCardWidth = containerWidth * 0.3;
        }

        setCardWidth(newCardWidth);

        // Ajustar duración según la cantidad de tarjetas
        const totalWidth = CarruselData.length * (newCardWidth + 16);
        const newDuration = totalWidth / 100;
        setAnimationDuration(newDuration);

        setIsInitialized(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="services-section">
      <div className="services-carousel">
        <div className="continuous-carousel-container">
          <div
            ref={carouselRef}
            className={`continuous-carousel-track ${
              isInitialized ? "animate" : ""
            } ${isPaused ? "paused" : ""}`}
            style={{
              "--card-width": `${cardWidth}px`,
              "--animation-duration": `${animationDuration}s`,
            }}
          >
            {duplicatedServices.map((service, index) => (
              <div
                key={`${service.src}-${index}`}
                className="service-card"
                style={{
                  width: `${cardWidth}px`,
                  minWidth: `${cardWidth}px`,
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="card-image-container">
                  <video
                    src={service.src}
                    className="card-content"
                    width={300}
                    height={400}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
