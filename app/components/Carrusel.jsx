"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@/public/css/carrusel.css";

export default function Carrusel() {
  const swiperRef = useRef(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef({});

  useEffect(() => {
    fetch("/data/carrusel.json")
      .then((response) => response.json())
      .then((data) => {
        setWorks(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleVideoLoad = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index]
        .play()
        .catch((err) => console.log("Playback prevented:", err));
    }
  };

  return (
    <section className="video-carousel-container">
      <Swiper
        className="carousel-swiper"
        spaceBetween={16}
        slidesPerView={4}
        loop={true}
        speed={5000}
        autoplay={{
          delay: 0, // El carrusel se mueve automáticamente
          disableOnInteraction: false, // No deshabilitar el autoplay al interactuar
        }}
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 12 },
          640: { slidesPerView: 2.2, spaceBetween: 14 },
          768: { slidesPerView: 3.2, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
        }}
      >
        {loading
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <SwiperSlide
                  key={`skeleton-${index}`}
                  className="video-slide skeleton"
                ></SwiperSlide>
              ))
          : works.map((work, index) => (
              <SwiperSlide key={`video-${index}`} className="video-slide">
                <div className="video-container">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="video-element"
                    src={work.src}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onCanPlayThrough={() => handleVideoLoad(index)}
                  />
                  <div className="video-overlay">
                    <div className="video-info">
                      <h3 className="video-title">{work.title}</h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
}
