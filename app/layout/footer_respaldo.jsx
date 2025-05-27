"use client";
import React from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import "../../public/css/footer.css";

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        {/* Información de contacto */}
        <div className="footer-contact-row">
          <a href="mailto:contact@alonso.com" className="contact-button">
            <IoIosMail size={16} className="contact-icon" />
            <span>contact@alonso.com</span>
          </a>

          <a href="tel:+524441234567" className="contact-button">
            <FaWhatsapp size={16} className="contact-icon" />
            <span>+52 444 123 4567</span>
          </a>

          <a href="location" className="contact-button">
            <LuMapPin size={16} className="contact-icon" />
            <span>Peru, Lima</span>
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
              <FaWhatsapp size={16} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaTwitter size={16} />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaYoutube size={16} />
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
