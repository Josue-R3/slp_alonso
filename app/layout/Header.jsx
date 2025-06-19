"use client";
import { useState, useEffect } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import Link from "next/link";
import "../../public/css/header.css";

const Header = () => {
  return (
    <header>
        <div className="header-logo">
          <Link href="/" className="logo">
            <img src={"/images/brand/Logo02.webp"} alt="Logo Alonso Vasquez" />
          </Link>
        </div>
        <nav className="header-links">
          <Link href="/">Inicio</Link>
          <Link href="/portfolio">Portafolio</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contacto</Link>
        </nav>
    </header>
  );
};

export default Header;
