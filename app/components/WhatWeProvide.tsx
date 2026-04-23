'use client';

import { motion } from 'framer-motion';
import { Calculator, Layout, Globe } from 'lucide-react';

const FEATURES = [
  {
    title: 'Calculs de ferraillage',
    description: 'Outils simples pour dimensionner les armatures des poteaux, poutres, dalles et semelles.',
    icon: <Calculator className="w-8 h-8" />,
    color: 'bg-blue-50 text-blue-600',
    dotColor: 'bg-blue-600'
  },
  {
    title: 'Interface intuitive',
    description: 'Une interface claire et fluide adaptée aux étudiants, techniciens et ingénieurs.',
    icon: <Layout className="w-8 h-8" />,
    color: 'bg-indigo-50 text-indigo-600',
    dotColor: 'bg-indigo-600'
  },
  {
    title: 'Accès en ligne',
    description: 'Tous les outils sont disponibles directement dans le navigateur, sans installation.',
    icon: <Globe className="w-8 h-8" />,
    color: 'bg-emerald-50 text-emerald-600',
    dotColor: 'bg-emerald-600'
  }
];

export default function WhatWeProvide() {
  return (
    <section className="bg-slate-50/50 py-24 px-6 relative overflow-hidden">
      {/* Grille technique en arrière-plan (discrète) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div 
          className="h-full w-full" 
          style={{ 
            backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* En-tête basé sur l'image */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs block mb-4"
          >
            Notre Expertise
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Une solution complète pour vos projets
          </motion.h1>
        </div>

        {/* Grille des fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              className="group flex flex-col items-center text-center p-8 rounded-3xl transition-all duration-300 hover:bg-slate-50/80"
            >
              {/* Icône avec couleur spécifique */}
              <div className={`relative w-20 h-20 flex items-center justify-center rounded-2xl mb-8 transition-transform duration-500 group-hover:scale-110 ${feature.color}`}>
                <div className="absolute inset-0 rounded-2xl opacity-20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700 bg-current" />
                <div className="relative z-10">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">
                {feature.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed text-sm md:text-base max-w-[280px]">
                {feature.description}
              </p>

              {/* Barre de soulignement colorée au survol */}
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className={`w-12 h-1.5 rounded-full mx-auto ${feature.dotColor}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}