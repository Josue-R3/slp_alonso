"use client";

import React, { useEffect, useRef } from "react";
import "../styles/services2.css";

const Services2 = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      id: 1,
      title: "THE DIGITAL NOMADS:",
      subtitle: "HOW REMOTE WORK IS CHANGING PEOPLE'S LIVES",
      description:
        "Exploramos cómo el trabajo remoto está transformando la forma en que vivimos y trabajamos",
      category: "FEB 24, 2024",
      tags: ["BRANDING", "VIDEOGRAFÍA", "DOCUMENTARY"],
      image: "/images/other/record_n_landscape.webp",
      link: "#videografia",
    },
    {
      id: 2,
      title: "SPOTIFY PLATFORM AD:",
      subtitle: "HOW SPOTIFY IS HELPING CREATORS TO SUCCESS",
      description:
        "Campaña publicitaria mostrando cómo Spotify empodera a los creadores de contenido",
      category: "JAN 15, 2024",
      tags: ["BRANDING", "ADVERTISING"],
      image: "/images/other/DSC00182.webp",
      link: "#edicion",
    },
    {
      id: 3,
      title: "META CONNECT 2023 CONFERENCE:",
      subtitle: "THE FUTURE OF THE METAVERSE",
      description:
        "Cobertura exclusiva de la conferencia más importante sobre el futuro digital",
      category: "DEC 12, 2023",
      tags: ["BRANDING", "VIDEOGRAFÍA", "STREAMING"],
      image: "/images/other/DSC00178.webp",
      link: "#drones",
    },
    {
      id: 4,
      title: "GOOGLE MAPS AD:",
      subtitle: "HOW GOOGLE IS IMPROVING PEOPLE'S EVERYDAY LIFE",
      description:
        "Spot publicitario destacando el impacto de Google Maps en nuestra vida cotidiana",
      category: "NOV 08, 2023",
      tags: ["BRANDING", "MOBILE", "ADVERTISING"],
      image: "/images/other/DSC00177.webp",
      link: "#marketing",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe title
    if (sectionRef.current) {
      const title = sectionRef.current.querySelector(".services2-title");
      if (title) observer.observe(title);
    }

    // Observe cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        setTimeout(() => {
          observer.observe(card);
        }, index * 100);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services2-section" ref={sectionRef}>
      <div className="services2-container">
        <div className="services2-header">
          <h2 className="services2-title fade-element">SELECTED WORK</h2>
        </div>

        <div className="services2-list">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-item fade-element"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="service-image-container">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-image"
                />
                <div className="service-overlay">
                  <div className="service-content">
                    <div className="service-text">
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-subtitle">{service.subtitle}</p>
                    </div>
                    <div className="service-meta">
                      <span className="service-date">{service.category}</span>
                      <div className="service-tags">
                        {service.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="service-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="service-action">
                    <a href={service.link} className="service-link">
                      <svg
                        className="service-arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services2;
