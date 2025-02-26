"use client";
import { useState, useEffect } from "react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import Link from "next/link";

const PortfolioContainer = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [categories, setCategories] = useState([]);

  // 📌 Fetch dinámico de `portfolio.json`
  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((res) => res.json())
      .then((data) => {
        setPortfolioData(data.portfolio);
        const mixCategories = data.portfolio.flatMap((item) => item.categories);
        setCategories([...new Set(mixCategories)]);
      })
      .catch((error) => console.error("Error cargando portfolio.json:", error));
  }, []);

  if (!portfolioData) return <p>Loading...</p>;

  return (
    <div className="portfolio-area portfolio-default-area">
      <div className="container-fluid">
        {/* 📌 Filtros */}
        <div className="row">
          <div className="col-12">
            <div className="messonry-button text-center mb-50">
              <button className="is-checked">Todos</button>
              {categories.map((cat, idx) => (
                <button key={idx}>{cat}</button>
              ))}
            </div>
          </div>
        </div>

        {/* 📌 Lista de Portfolio */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 portfolio-list mb-n30">
          <LightGallery plugins={[lgThumbnail, lgZoom]}>
            {portfolioData.map((item) => (
              <div key={item.id} className={`col masonry-grid mb-30`}>
                <PortfolioItem portfolio={item} />
              </div>
            ))}
          </LightGallery>
        </div>

        {/* 📌 Botón de carga */}
        <div className="row">
          <div className="col-lg-12 text-center mt-60">
            <button className="btn-portfolio">Cargar más</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 📌 Componente PortfolioItem (Imagen o Video)
const PortfolioItem = ({ portfolio }) => {
  return (
    <div className="single-portfolio">
      {portfolio.contentType === "Fotografía" ? (
        <a
          href={portfolio.imageUrl}
          data-src={portfolio.imageUrl} // ✅ Necesario para LightGallery
          data-lg-size="1400-900"
          className="gallery-item" // ✅ Selector para LightGallery
        >
          <div className="thumbnail">
            <div className="overlay">
              <img src={portfolio.imageUrl} alt={portfolio.companyName} />
            </div>
          </div>
        </a>
      ) : (
        <div className="thumbnail">
          <video src={portfolio.videoUrl} controls width="100%" />
        </div>
      )}
      <div className="content">
        <h3 className="title">
          <Link href={`/portfolio-details/${portfolio.id}`}>
            {portfolio.companyName}
          </Link>
        </h3>
        <p className="desc">{portfolio.photoType || portfolio.videoType}</p>
      </div>
    </div>
  );
};


export default PortfolioContainer;
