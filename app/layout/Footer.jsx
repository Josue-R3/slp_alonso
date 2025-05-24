"use client";
import React from "react";
import Link from "next/link";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import "../../public/css/footer.css";

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">

        {/* Información de contacto */}
        <div className="footer-contact-row">
          <a href="mailto:contact@alonso.com" className="flat-button">
            <Mail size={18} className="button-icon" />
            <span className="button-text">contact@alonso.com</span>
          </a>

          <a href="tel:+524441234567" className="flat-button">
            <Phone size={18} className="button-icon" />
            <span className="button-text">+52 444 123 4567</span>
          </a>

          <a href="location" className="flat-button">
            <MapPin size={18} className="button-icon" />
            <span className="button-text">Peru, Lima</span>
          </a>
        </div>

        {/* Redes sociales */}
        <div className="footer-social-section">
          <span className="social-text">SÍGUEME EN REDES</span>
          <div className="social-icons">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Alonso Vasquez. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
