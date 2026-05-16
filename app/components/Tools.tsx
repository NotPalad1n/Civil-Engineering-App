'use client';

import { motion, Variants } from 'framer-motion';
import ToolCard from './ToolCard';
import { SlabIcon, BeamIcon, ColumnIcon, FootingIcon, StripFootingIcon } from './Icons/StructuralIcons';
import { EqualApproximately } from 'lucide-react';

const BAELtools = [
  {
    title: 'Dalle pleine',
    description: 'Ferraillage des dalles pleines.',
    href: '/bael/dalle',
    icon: <SlabIcon className="w-8 h-8" />
  },
  {
    title: 'Poutre en béton armé',
    description: 'Ferraillage des poutres rectangulaires.',
    href: '/bael/poutre',
    icon: <BeamIcon className="w-8 h-8" />
  },
  {
    title: 'Poteau en béton armé',
    description: "Ferraillage des poteaux.",
    href: '/bael/poteau',
    icon: <ColumnIcon className="w-8 h-8" />
  },
  {
    title: 'Semelle isolée centrée',
    description: 'Ferraillage et vérification des contraintes au sol des semelles isolées centrées.',
    href: '/bael/semelle-isolee',
    icon: <FootingIcon className="w-8 h-8" />
  },
  {
    title: 'Semelle filante centrée',
    description: 'Ferraillage et vérification des contraintes au sol des semelles filantes centrées.',
    href: '/bael/semelle-filante',
    icon: <StripFootingIcon className="w-8 h-8" />
  }
];

const Geotools = [
  {
    title: 'Corrélations',
    description: 'Estimation des paramètres mécaniques à partir des essais in-situ.',
    href: '/geotechnique/correlations',
    icon: <EqualApproximately className="w-6 h-6" />
  }
];

// Configuration de l'animation pour les conteneurs de grille
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Configuration de l'animation pour chaque carte individuelle
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" } // Désormais TS sait que c'est une transition valide
  }
};

export default function Tools() {
  return (
    <section className="py-24 bg-white" id="tools">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* En-tête de section avec petit titre bleu */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs block mb-4"
          >
            Nos Modules
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
          >
            Bibliothèque d'outils
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto"
          >
            Des modules de calcul précis conformes aux règlements en vigueur pour optimiser vos projets de structure.
          </motion.p>
        </div>

        {/* Section BAEL */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 mb-8"
          >
            <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">BAEL 91 mod 99</h3>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {BAELtools.map((tool) => (
              <motion.div key={tool.title} variants={itemVariants}>
                <ToolCard {...tool} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Section Géotechnique */}
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 mb-8"
          >
            <div className="h-8 w-1.5 bg-blue-400 rounded-full" />
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Géotechnique</h3>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {Geotools.map((tool) => (
              <motion.div key={tool.title} variants={itemVariants}>
                <ToolCard {...tool} />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}