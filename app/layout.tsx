import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Outfit } from "next/font/google";

const OutfitFont = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CivilTools",
  description: "Des outils de génie civil simples et efficaces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${OutfitFont.className}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
