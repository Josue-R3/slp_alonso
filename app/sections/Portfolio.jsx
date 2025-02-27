"use client"; // Para asegurar que se ejecute solo en el cliente

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import "lightgallery/css/lightgallery.css";

// Importar dinámicamente para evitar errores en SSR
const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
const Isotope = dynamic(() => import("isotope-layout"), { ssr: false });
const imagesLoaded = dynamic(() => import("imagesloaded"), { ssr: false });

const PortfolioContainer = () => {
  // 🟢 Estado donde almacenaremos los datos del portafolio
  const [portfolioData, setPortfolioData] = useState([]);

  // 🟢 Estado para manejar la categoría seleccionada en los filtros
  const [filter, setFilter] = useState("*");

  // 🟢 Estado donde guardaremos las categorías únicas de los proyectos
  const [categories, setCategories] = useState([]);

  // ✅ 1️⃣ Cargar datos del JSON al montar el componente
  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((res) => res.json())
      .then((data) => {
        setPortfolioData(data.portfolio);
        // Extraer categorías únicas
        const allCategories = data.portfolio.flatMap((item) => item.categories);
        setCategories([...new Set(allCategories)]);
      })
      .catch((error) => console.error("Error al cargar el JSON:", error));
  }, []);

  // ✅ 2️⃣ Inicializar Masonry (Isotope.js) cuando las imágenes estén cargadas
  useEffect(() => {
    if (portfolioData.length === 0) return; // Evita ejecutar si no hay datos cargados

    const grid = document.querySelector(".portfolio-list");
    if (!grid) return;

    const iso = new Isotope(grid, {
      itemSelector: ".masonry-grid",
      layoutMode: "masonry",
    });

    imagesLoaded(grid, () => {
      iso.layout();
    });

    return () => {
      iso.destroy();
    };
  }, [portfolioData]);

  // ✅ 3️⃣ Filtrar los proyectos según la categoría seleccionada
  const filteredPortfolio =
    filter === "*"
      ? portfolioData
      : portfolioData.filter((item) => item.categories.includes(filter));

  return (
    <div className="portfolio-area portfolio-default-area">
      <div className="container-fluid">
        {/* ✅ 4️⃣ Sección de botones de filtro */}
        <div className="messonry-button text-center mb-50">
          <button
            className={filter === "*" ? "is-checked" : ""}
            onClick={() => setFilter("*")}
          >
            <span className="filter-text">Todos</span>
          </button>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={filter === cat ? "is-checked" : ""}
              onClick={() => setFilter(cat)}
            >
              <span className="filter-text">{cat}</span>
            </button>
          ))}
        </div>

        {/* ✅ 5️⃣ Sección de imágenes en formato Masonry */}
        <LightGallery selector=".lightgallery-item">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 portfolio-list mb-n30">
            {filteredPortfolio.map((portfolio) => (
              <div key={portfolio.id} className="col masonry-grid mb-30">
                <div className="single-portfolio">
                  {/* ✅ LightGallery requiere un <a> con "href" y "data-src" */}
                  <a
                    href={portfolio.imageUrl}
                    data-src={portfolio.imageUrl}
                    className="lightgallery-item"
                  >
                    <div className="thumbnail">
                      <div className="overlay">
                        {/* ✅ next/image optimiza automáticamente las imágenes */}
                        <Image
                          src={portfolio.imageUrl}
                          alt={portfolio.companyName}
                          width={400}
                          height={300}
                          priority
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
