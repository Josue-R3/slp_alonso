"use client"; // Necesario en Next.js cuando se usan hooks de React (useState, useEffect)

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css"; // Importa los estilos de LightGallery
import imagesLoaded from "imagesloaded"; // Permite manejar imágenes cargadas antes de aplicar Masonry
import Isotope from "isotope-layout"; // Librería para manejar el layout tipo "Masonry"

const PortfolioContainer = () => {
  // 🟢 Estado donde almacenaremos los datos del portafolio
  const [portfolioData, setPortfolioData] = useState([]);

  // 🟢 Estado para manejar la categoría seleccionada en los filtros
  const [filter, setFilter] = useState("*");

  // 🟢 Estado donde guardaremos las categorías únicas de los proyectos
  const [categories, setCategories] = useState([]);

  // ✅ 1️⃣ Cargar datos del JSON al montar el componente
  useEffect(() => {
    fetch("/data/portfolio.json") // Carga el archivo JSON local
      .then((res) => res.json()) // Convierte la respuesta en JSON
      .then((data) => {
        setPortfolioData(data.portfolio); // Guarda los datos en el estado
        // Extraemos todas las categorías y eliminamos duplicados
        const allCategories = data.portfolio.flatMap((item) => item.categories);
        setCategories([...new Set(allCategories)]);
      })
      .catch((error) => console.error("Error al cargar el JSON:", error));
  }, []);

  // ✅ 2️⃣ Inicializar Masonry (Isotope.js) cuando las imágenes estén cargadas
  useEffect(() => {
    const grid = document.querySelector(".portfolio-list"); // Selecciona la lista de imágenes
    if (!grid) return;

    const iso = new Isotope(grid, {
      itemSelector: ".masonry-grid", // Define los elementos que formarán la cuadrícula
      layoutMode: "masonry", // Establece el diseño tipo Masonry
    });

    // Esperar a que las imágenes estén cargadas antes de inicializar Masonry
    imagesLoaded(grid, () => {
      iso.layout();
    });

    // Limpiar Isotope cuando el componente se desmonte
    return () => {
      iso.destroy();
    };
  }, [portfolioData]); // Se ejecuta cuando `portfolioData` cambia

  // ✅ 3️⃣ Filtrar los proyectos según la categoría seleccionada
  const filteredPortfolio =
    filter === "*"
      ? portfolioData // Si el filtro es "*", mostrar todos los proyectos
      : portfolioData.filter((item) => item.categories.includes(filter));

  return (
    <div className="portfolio-area portfolio-default-area">
      <div className="container-fluid">
        {/* ✅ 4️⃣ Sección de botones de filtro */}
        <div className="messonry-button text-center mb-50">
          <button
            className={filter === "*" ? "is-checked" : ""} // Resaltar el botón activo
            onClick={() => setFilter("*")} // Al hacer clic, mostrar todos los proyectos
          >
            <span className="filter-text">Todos</span>
          </button>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={filter === cat ? "is-checked" : ""} // Resaltar la categoría activa
              onClick={() => setFilter(cat)} // Filtrar por categoría
            >
              <span className="filter-text">{cat}</span>
            </button>
          ))}
        </div>

        {/* ✅ 5️⃣ Sección de imágenes en formato Masonry */}
        <LightGallery>
          {" "}
          {/* LightGallery envuelve todas las imágenes */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 portfolio-list mb-n30">
            {filteredPortfolio.map((portfolio) => (
              <div key={portfolio.id} className="col masonry-grid mb-30">
                <div className="single-portfolio">
                  {/* ✅ LightGallery requiere un <a> con "data-src" para abrir la imagen en visor */}
                  <a href={portfolio.imageUrl} data-src={portfolio.imageUrl}>
                    <div className="thumbnail">
                      <div className="overlay">
                        {/* ✅ next/image optimiza automáticamente las imágenes */}
                        <Image
                          src={portfolio.imageUrl} // URL de la imagen
                          alt={portfolio.companyName} // Texto alternativo
                          width={400} // Ancho de la imagen
                          height={300} // Alto de la imagen
                          priority // Carga prioritaria
                        />
                      </div>
                    </div>
                  </a>

                  {/* ✅ Información del proyecto */}
                  <div className="content">
                    <h3 className="title">
                      <Link href={`/portfolio-details/${portfolio.id}`}>
                        {portfolio.companyName}
                      </Link>
                    </h3>
                    <p className="desc">{portfolio.photoType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </LightGallery>

        {/* ✅ 6️⃣ Botón de carga (puede ser usado para paginación en el futuro) */}
        <div className="row">
          <div className="col-lg-12 text-center mt-60">
            <button className="btn-portfolio">Cargar más</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioContainer;
