"use client";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import "@/public/css/header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Menú Hamburguesa + Texto */}
      <div className="header-menu">
        <Bars3Icon className="header-menu-icon" />
        <span className="header-menu-text">Menu</span>
      </div>

      {/* Logo */}
      <div>
        <Link href="/" className="header-logo">
          Alonso Vasquez
        </Link>
      </div>

      {/* Icono de búsqueda */}
      <div>
        <MagnifyingGlassIcon className="header-search" />
      </div>
    </header>
  );
};

export default Header;
