'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    // 1. Fond principal s'adapte en slate-950 en mode sombre
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      
      {/* Background : Grille technique + Lueur bleue subtile */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          // Ajustement léger de l'opacité sur fond sombre pour que les points restent subtilement visibles
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{ 
            backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }} 
        />
        {/* Atténuation de la lueur bleue arrière en mode sombre pour ne pas aveugler l'utilisateur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 dark:bg-blue-950/20 rounded-full blur-3xl opacity-50 dark:opacity-40 transition-colors duration-300" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        
        {/* Petit badge d'annonce */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          // Ajustement du fond et des bordures du badge
          className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 px-4 py-2 rounded-full mb-8 transition-colors duration-300"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-600 animate-pulse" />
          <span className="text-blue-600 dark:text-blue-600 text-xs font-bold uppercase tracking-widest">
            Conforme Eurocode & BAEL
          </span>
        </motion.div>

        {/* Titre Principal */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          // text-slate-900 devient text-slate-50 à l'activation du dark mode
          className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-slate-50 leading-[1.1] tracking-tight mb-8 transition-colors duration-300"
        >
          Des outils de génie civil <br />
          <span className="text-blue-600 dark:text-blue-600">simples et efficaces</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          // text-slate-500 s'éclaircit en slate-400
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-colors duration-300"
        >
          Calculez les sections de ferraillage pour les poteaux, poutres, dalles et semelles avec une précision professionnelle.
        </motion.p>

        {/* Bouton d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >

          <button
            onClick={() => {
              // 1. Chercher la section par son ID
              const targetElement = document.getElementById('tools');
              if (targetElement) {
                // 2. Déclencher un défilement fluide sans toucher à l'URL
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="group bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-blue-200 dark:shadow-none transition-all duration-300 flex items-center gap-3 active:scale-95 cursor-pointer"
          >
            Commencer les calculs
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <Link href="/about">
            {/* Bouton secondaire : Changement de la couleur du texte et de l'effet de survol */}
            <button className="text-slate-600 dark:text-slate-300 font-bold px-8 py-4 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all duration-300 cursor-pointer">
              En savoir plus
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}