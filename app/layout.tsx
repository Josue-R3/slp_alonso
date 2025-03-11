import * as React from "react";
import type { Metadata } from "next";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "../public/css/globals.css";

// ✅ Ahora `metadata` puede permanecer aquí porque es un Server Component
export const metadata: Metadata = {
  title: "Alonso Vasquez",
  description: "Portafolio y proyectos de Alonso Vasquez.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
