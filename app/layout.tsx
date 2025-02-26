import type { Metadata } from "next";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "../public/css/globals.css";
import "../public/css/header.css";
import "../public/css/intro.css";

export const metadata: Metadata = {
  title: "Alonso Vasquez",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
