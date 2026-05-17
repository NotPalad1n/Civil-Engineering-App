import type { Metadata } from "next";
import "./globals.css";
import 'katex/dist/katex.min.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import InputScrollBlocker from "./components/InputScrollBlocker";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./components/ThemeProvider";

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
    <html lang="fr">
      <ThemeProvider>
        <body className={`${RubikFont.className} flex flex-col justify-between min-h-screen overflow-y-scroll bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300 antialiased`}>
          <InputScrollBlocker />
          <ScrollToTop />   
          <Navbar />
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}

