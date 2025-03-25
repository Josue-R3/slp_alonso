"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Slider() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);

  // Fetch videos from slider.json
  useEffect(() => {
    fetch("/data/slider.json")
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
    if (isAnimating || loading || works.length < 4) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? works.length - 3 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNext = () => {
    if (isAnimating || loading || works.length < 4) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex >= works.length - 3 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="w-full bg-gray-100 py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h2 className="text-5xl font-bold mb-6">Audiovisuales</h2>

            {loading ? (
              <>
                <div className="skeleton-base h-4 w-full mb-2"></div>
                <div className="skeleton-base h-4 w-11/12 mb-2"></div>
                <div className="skeleton-base h-4 w-10/12 mb-2"></div>
                <div className="skeleton-base h-4 w-9/12 mb-6"></div>
              </>
            ) : (
              <p className="text-gray-600 mb-6">
                Pendiente mejorar el slider y la reproduccion automatica de video
              </p>
            )}

            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                disabled={loading || isAnimating || works.length < 4}
                className={`p-3 border border-gray-300 transition duration-300 ${
                  loading || isAnimating || works.length < 4
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={loading || isAnimating || works.length < 4}
                className={`p-3 border border-gray-300 transition duration-300 ${
                  loading || isAnimating || works.length < 4
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="md:col-span-8 overflow-hidden">
            <div className="relative" ref={sliderRef}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {loading
                  ? Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg overflow-hidden shadow-md"
                        >
                          <div className="skeleton-base h-80 w-full"></div>
                          <div className="p-4">
                            <div className="skeleton-base h-6 w-3/4 mb-2"></div>
                            <div className="skeleton-base h-4 w-1/3"></div>
                          </div>
                        </div>
                      ))
                  : works
                      .slice(currentIndex, currentIndex + 3)
                      .map((work, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                        >
                          <div className="relative h-80 overflow-hidden">
                            {work.type === "video" ? (
                              <video
                                controls
                                src={work.src}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img
                                src={work.image || "/placeholder.svg"}
                                alt={work.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-xl font-bold mb-1">
                              {work.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {work.excerpt || "Promotional Video"}
                            </p>
                          </div>
                        </div>
                      ))}
              </div>
            </div>

            {!loading && works.length > 0 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.max(1, works.length - 2) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentIndex === index ? "bg-black w-4" : "bg-gray-300"
                      }`}
                      onClick={() => {
                        if (!isAnimating) {
                          setIsAnimating(true);
                          setCurrentIndex(index);
                          setTimeout(() => setIsAnimating(false), 600);
                        }
                      }}
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
