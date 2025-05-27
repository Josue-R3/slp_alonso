"use client";
import Link from "next/link";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import "../../public/css/footer.css";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container responsive-footer">
        {/* Solo "Sígueme en redes" sobre la línea divisoria */}
        <div className="border-text-right">
          <span>SÍGUEME EN REDES SOCIALES</span>
        </div>

        {/* Contenido principal del footer - Desktop */}
        <div className="footer-content desktop-layout">
          {/* Información izquierda */}
          <div className="footer-info-wrapper">
            <p className="footer-text">
              <span className="copyright-text">
                © {new Date().getFullYear()} Alonso Vasquez
              </span>
              <span className="separator"> | </span>
              <span className="developer-text">
                Desarrollado por{" "}
                <Link
                  href="https://josuedev.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Josue Ruiz
                </Link>
              </span>
            </p>
          </div>

          {/* Redes sociales derecha */}
          <div className="footer-social-wrapper">
            <div className="social-icons">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaXTwitter size={16} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Contenido principal del footer - Mobile */}
        <div className="footer-content mobile-layout">
          {/* Redes sociales arriba en mobile */}
          <div className="footer-social-wrapper mobile-social">
            <div className="social-icons">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaXTwitter size={16} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* Información abajo en mobile */}
          <div className="footer-info-wrapper mobile-info">
            <p className="footer-text mobile-text">
              <span className="copyright-line">
                © {new Date().getFullYear()} Alonso Vasquez
              </span>
              <span className="developer-line">
                Desarrollado por{" "}
                <Link
                  href="https://josuedev.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Josue Ruiz
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
