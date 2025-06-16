"use client";
import { useState, useEffect } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import Link from "next/link";
import "../../public/css/header.css";
import LogoAlonso from "../../public/images/brand/Logo01.webp";

const Header = () => {
  // Estado para detectar si es móvil o desktop
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detectar el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    
    // Configuración inicial
    handleResize();
    
    // Evento para cuando cambia el tamaño
    window.addEventListener("resize", handleResize);
    
    // Limpieza del evento
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      {/* Logo - Solo la imagen, sin texto */}
      <div className="header-logo">
        <Link href="/" className="header-logo-link">
          <img src={LogoAlonso.src} alt="Logo" />
        </Link>
      </div>

      {/* Navegación - Todos los enlaces a la derecha */}
      {!isMobile && (
        <nav className="header-nav">
          <Link href="/portfolio" className="nav-link">
            Portafolio
          </Link>
          <Link href="/services" className="nav-link">
            Servicios
          </Link>
          <Link href="/contact" className="nav-link">
            Contacto
          </Link>
        </nav>
      )}

      {/* Botón menú en móvil */}
      {isMobile && (
        <button className="header-menu-button" onClick={toggleMenu}>
          <HiMiniBars3BottomRight className="header-menu-icon" />
        </button>
      )}

      {/* Menú móvil desplegable */}
      {isMobile && (
        <nav className={`header-nav-mobile ${menuOpen ? "open" : ""}`}>
          <Link href="/portfolio" className="nav-link-mobile">
            Portafolio
          </Link>
          <Link href="/services" className="nav-link-mobile">
            Servicios
          </Link>
          <Link href="/contact" className="nav-link-mobile">
            Contacto
          </Link>
          <Link href="/about" className="nav-link-mobile">
            Acerca de mí
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
