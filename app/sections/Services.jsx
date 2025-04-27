"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import "@/public/css/services.css"

import CarruselData from "@public/data/carrusel.json"


// Datos de ejemplo para los servicios con colores asignados para cada tarjeta
const services = [
  {
    id: 1,
    title: "STREAMING PRODUCTION",
    description:
      "Integer aliquam tempor libero massa id justo, pellentesque velit eget lacinia pellentesque eu duis a",
    image: "/placeholder.svg?height=400&width=300",
    color: "#FF5252", // Rojo
  },
  {
    id: 2,
    title: "MUSIC VIDEOS PRODUCTION",
    description:
      "Amet nisl ut eget accumsan eleifend tincidunt magna id maecenas sem lectus adipiscing nulla quis",
    image: "/placeholder.svg?height=400&width=300",
    color: "#4CAF50", // Verde
  },
  {
    id: 3,
    title: "ADVERTISING PRODUCTION",
    description:
      "Non rutrum justo, interdum maecenas volutpat eget sed pellentesque libero, dui pellentesque pulvinar fames ornare",
    image: "/placeholder.svg?height=400&width=300",
    color: "#2196F3", // Azul
  },
  {
    id: 4,
    title: "STREAM PRODUCTION",
    description:
      "Integer aliquam tempor libero massa id justo, pellentesque velit eget lacinia pellentesque eu duis a",
    image: "/placeholder.svg?height=400&width=300",
    color: "#FFC107", // Amarillo
  },
  {
    id: 5,
    title: "DOCUMENTARY PRODUCTION",
    description:
      "Amet nisl ut eget accumsan eleifend tincidunt magna id maecenas sem lectus adipiscing nulla quis",
    image: "/placeholder.svg?height=400&width=300",
    color: "#9C27B0", // Púrpura
  },
]

export default function ServicesCarousel() {
  const carouselRef = useRef(null)
  const [cardWidth, setCardWidth] = useState(300) // Ancho predeterminado
  const [animationDuration, setAnimationDuration] = useState(30) // Duración en segundos
  const [isPaused, setIsPaused] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Duplicamos los servicios para crear un efecto de loop continuo
  const duplicatedServices = [...services, ...services, ...services]

  // Efecto para calcular el ancho de las tarjetas y ajustar la velocidad de animación
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const containerWidth =
          (carouselRef.current.parentElement && carouselRef.current.parentElement.clientWidth) ||
          window.innerWidth

        // Calcular el ancho de cada tarjeta basado en el tamaño de la pantalla
        let newCardWidth = 300

        if (window.innerWidth < 640) {
          newCardWidth = containerWidth * 0.8 // 80% del ancho en móviles
        } else if (window.innerWidth < 1024) {
          newCardWidth = containerWidth * 0.4 // 40% del ancho en tablets
        } else {
          newCardWidth = containerWidth * 0.3 // 30% del ancho en desktop
        }

        setCardWidth(newCardWidth)

        // Ajustar la duración de la animación basada en la cantidad de tarjetas
        const totalWidth = services.length * (newCardWidth + 16) // 16px es el gap
        const newDuration = totalWidth / 100 // Ajustar este valor para cambiar la velocidad
        setAnimationDuration(newDuration)

        // Marcar como inicializado después de calcular las dimensiones
        setIsInitialized(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="services-section">
      {/* Encabezado de la sección */}
      <div className="services-header">
        <h2>OUR SERVICES</h2>
        <p>
          Montes, et sem eu sit etiam cursus purus ut erat nulla at iaculis consectetur id quis senectus enim nisl
          aliquam at varius congue neque, elit, sodales ultricies odio
        </p>
        <Link href="/services" className="more-services-link">
          MORE SERVICES <span className="arrow">→</span>
        </Link>
      </div>

      {/* Contenedor del carrusel continuo */}
      <div
        className="continuous-carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Contenedor con animación continua */}
        <div
          ref={carouselRef}
          className={`continuous-carousel-track ${isInitialized ? "animate" : ""} ${
            isPaused ? "paused" : ""
          }`}
          style={{
            "--card-width": `${cardWidth}px`,
            "--animation-duration": `${animationDuration}s`,
          }}
        >
          {/* Mapear los servicios duplicados para crear un loop continuo */}
          {duplicatedServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className="service-card"
              style={{
                width: `${cardWidth}px`,
                minWidth: `${cardWidth}px`,
              }}
            >
              {/* Contenedor de la imagen con posición relativa para el overlay */}
              <div className="card-image-container">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={300}
                  height={400}
                  className="card-image"
                />
                {/* Overlay oscuro para mejorar la legibilidad del texto */}
                <div className="image-overlay"></div>
              </div>

              {/* Contenido de texto de la tarjeta con color específico */}
              <div className="card-content">
                <h3 style={{ color: service.color }}>{service.title}</h3>
                <p style={{ color: service.color }}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}