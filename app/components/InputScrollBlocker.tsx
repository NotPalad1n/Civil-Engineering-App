"use client";

import { useEffect } from "react";

export default function InputScrollBlocker() {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Vérifie si l'élément focus est un input de type number
      if (
        document.activeElement instanceof HTMLInputElement &&
        document.activeElement.type === "number"
      ) {
        // Retire le focus pour stopper le changement de valeur
        document.activeElement.blur();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return null; // Ce composant ne génère pas de HTML
}