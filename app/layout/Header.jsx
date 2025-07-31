"use client";
import { useState, useEffect } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import Link from "next/link";
import "../styles/header.css";

const Header = () => {
  return (
    <header>
        <div className="header-logo">
          <Link href="/" className="logo">
            <img src={"/images/brand/Logo02_white.webp"} alt="Logo Alonso Vasquez" />
          </Link>
        </div>
        <nav className="header-links">
          <Link href="/">Inicio</Link>
          <Link href="/">Portafolio</Link>
          <Link href="/">Blog</Link>
          <Link href="/">Contacto</Link>
        </nav>
    </header>
  );
};

export default Header;
