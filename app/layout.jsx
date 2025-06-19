import * as React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "../public/css/globals.css";

export const metadata = {
  title: "Alonso Vasquez",
  description: "Portafolio y proyectos de Alonso Vasquez.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
