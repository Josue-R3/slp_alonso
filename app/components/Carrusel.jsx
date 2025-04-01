"use client";

// TODO: Refactorizar para que sea un componente de 4 videos por vista total 8 slider automatico con hover:pause hover descripción

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carrusel() {
  const swiperRef = useRef();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef({});

  // Función para manejar la carga de videos
  const handleVideoLoad = (index) => {
    videoRefs.current[index]
      ?.play()
      .catch((err) => console.log("Playback prevented:", err));
  };

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
        // Precarga los videos usando createElement
        data.forEach((work, index) => {
          const video = document.createElement("video");
          video.src = work.src;
          video.load();
          video.muted = true;
          video.playsInline = true;
          video.loop = true;
          videoRefs.current[index] = video;
        });
      })
      .catch((err) => console.error("Error fetching slider data:", err))
      .finally(() => setLoading(false));

    // Cleanup
    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video && !video.paused) {
          video.pause();
        }
      });
    };
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Sección de navegación izquierda */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-4">
          <h2 className="text-2xl font-bold text-teal-600">Videos Portfolio</h2>
          <div className="flex gap-4">
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={loading}
              aria-label="Anterior video"
            >
              Anterior
            </button>
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={loading}
              aria-label="Siguiente video"
            >
              Siguiente
            </button>
          </div>
        </div>

        {/* Sección de slides derecha */}
        <div className="w-full md:w-2/3 flex flex-col items-center gap-6">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="w-full h-[400px]"
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            slidesPerGroup={1}
            loop={true}
            onSlideChange={(swiper) => {
              // Manejar la reproducción de videos cuando cambia el slide
              const activeIndices = [
                swiper.activeIndex,
                swiper.activeIndex + 1,
                swiper.activeIndex + 2,
              ].map((i) => i % works.length);

              Object.entries(videoRefs.current).forEach(([index, video]) => {
                if (activeIndices.includes(Number(index))) {
                  video.play().catch(() => {});
                } else {
                  video.pause();
                }
              });
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {loading
              ? // Skeleton loading
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <SwiperSlide
                      key={index}
                      className="rounded-xl overflow-hidden bg-gray-200 animate-pulse"
                    >
                      <div className="aspect-video"></div>
                    </SwiperSlide>
                  ))
              : // Videos content
                works.map((work, index) => (
                  <SwiperSlide
                    key={index}
                    className="group rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105"
                  >
                    <div className="relative w-full h-full aspect-video">
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        className="absolute inset-0 w-full h-full object-cover"
                        src={work.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onLoadedData={() => handleVideoLoad(index)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/90 transition-colors">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-lg font-semibold mb-1 transform group-hover:-translate-y-1 transition-transform">
                            {work.title}
                          </h3>
                          {work.excerpt && (
                            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                              {work.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>

          {/* Paginación externa y centrada */}
          <div className="swiper-pagination flex justify-center gap-2 mt-4"></div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          position: static !important;
          margin-top: 1rem;
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #0d9488 !important;
          opacity: 0.5;
          cursor: pointer;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
