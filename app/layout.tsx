import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
