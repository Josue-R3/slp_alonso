"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "@/public/css/carrusel.css";

export default function Carrusel() {
  const swiperRef = useRef(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState({});
  const videoRefs = useRef({});
  const preloadedVideos = useRef({});

  // Usamos useMemo para evitar que se haga la petición de los videos al refrescar la página
  const videosData = useMemo(() => {
    // Carga los datos solo una vez al cargar el componente
    fetch("/data/carrusel.json")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWorks(data);
        } else {
          console.error("Invalid data format for carrusel.json");
        }
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, []); // El segundo parámetro vacío asegura que solo se ejecute una vez

  // Función para precargar videos
  const preloadVideo = async (src, index) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
      video.muted = true;

      video.oncanplaythrough = () => {
        preloadedVideos.current[index] = true;
        setLoadedVideos((prev) => ({ ...prev, [index]: true }));
        resolve(true);
      };

      video.onerror = () => {
        console.error(`Error preloading video ${index}`);
        resolve(false);
      };

      setTimeout(() => {
        if (!preloadedVideos.current[index]) {
          setLoadedVideos((prev) => ({ ...prev, [index]: true }));
          resolve(true);
        }
      }, 5000);
    });
  };

  const handleVideoLoad = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].play().catch((err) => {
        console.log("Playback prevented:", err);
      });
    }
  };

  useEffect(() => {
    if (works.length > 0) {
      setLoading(true);
      const preloadPromises = works.map((work, index) =>
        preloadVideo(work.src, index)
      );
      Promise.all(preloadPromises).finally(() => setLoading(false));
    }
  }, [works]); // Cuando los works cambian (después de la petición de los datos), empieza a cargar los videos

  return (
    <section className="video-carousel-container">
      <div className="carousel-wrapper">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="video-swiper"
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={4}
          loop={true}
          speed={5000} // Aumento la velocidad del movimiento
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          simulateTouch={false} // Deshabilitar el desplazamiento táctil y con mouse
          allowTouchMove={false} // Deshabilitar el movimiento táctil
          scrollbar={{
            draggable: false, // Desactivar el draggable en el Scrollbar
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4.2,
              spaceBetween: 16,
            },
          }}
        >
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <SwiperSlide
                    key={`skeleton-${index}`}
                    className="video-slide skeleton"
                  >
                    <div className="video-aspect-ratio"></div>
                  </SwiperSlide>
                ))
            : works.map((work, index) => (
                <SwiperSlide key={`video-${index}`} className="video-slide">
                  <div className="video-container">
                    {loadedVideos[index] ? (
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
                    ) : (
                      <div className="video-loader">
                        <div className="loader-spinner"></div>
                      </div>
                    )}
                    <div className="video-overlay">
                      <div className="video-info">
                        <h3 className="video-title">{work.title}</h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}
