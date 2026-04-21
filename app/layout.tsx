import type { Metadata } from "next";
import "./globals.css";
import 'katex/dist/katex.min.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import InputScrollBlocker from "./components/InputScrollBlocker";

// import { Outfit } from "next/font/google";

// const OutfitFont = Outfit({
//   subsets: ["latin"],
//   variable: "--font-outfit",
// });

import { Rubik } from "next/font/google";

const RubikFont = Rubik({
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
      <body className={`${RubikFont.className} flex flex-col justify-between min-h-screen overflow-y-scroll`}>
        <Navbar />
        <InputScrollBlocker />
        {children}
        <Footer />
      </body>
    </html>
  );
}

