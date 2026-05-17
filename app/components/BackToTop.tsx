'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Gérer la visibilité au scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          /* AJUSTEMENTS DARK MODE SANS TOUCHER AUX ANIMATIONS :
            - transition-colors d'origine conservé pour garder la même réactivité au survol.
            - dark:shadow-none : Supprime l'ombre bleue sur fond sombre pour éviter l'effet néon.
            - border border-transparent dark:border-blue-500/30 : Un liseré discret pour détourer le bouton en mode nuit.
          */
          className="fixed bottom-8 right-8 z-[90] bg-blue-600 text-white p-4 rounded-2xl shadow-2xl shadow-blue-500/40 dark:shadow-none border border-transparent dark:border-blue-500/30 hover:bg-blue-700 transition-colors group cursor-pointer"
          aria-label="Retour en haut"
        >
          {/* L'animation de l'icône reste strictement identique à ta version d'origine */}
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}