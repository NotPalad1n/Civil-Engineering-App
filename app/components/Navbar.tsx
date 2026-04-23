'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, HardHat, ChevronRight } from 'lucide-react';

const NAV_LINKS = {
  bael: [
    { name: "Dalle en béton", href: "/bael/dalle" },
    { name: "Poutre en béton", href: "/bael/poutre" },
    { name: "Poteau en béton", href: "/bael/poteau" },
    { name: "Semelle isolée", href: "/bael/semelle-isolee" },
    { name: "Semelle filante", href: "/bael/semelle-filante" },
  ],
  geo: [
    { name: "Corrélations", href: "/geotechnique/correlations" },
    { name: "Fondation", href: "/geotechnique/fondation" },
  ]
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-[100] ">
      {/* Barre principale - Z-index élevé pour rester au-dessus du menu mobile */}
      <div className="max-w-7xl mx-auto h-20 px-6 flex justify-between items-center bg-white relative z-[130]">
        
        {/* Logo - CivilTools */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            CivilTools
          </span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-md font-semibold text-slate-600 hover:text-blue-600 transition-colors">Accueil</Link>
          <Link href="/about" className="text-md font-semibold text-slate-600 hover:text-blue-600 transition-colors">À propos</Link>

          {/* Mega Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button className="flex items-center space-x-1 text-md font-semibold text-slate-600 hover:text-blue-600 py-4 transition-colors">
              <span>Outils de calcul</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {toolsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full bg-white shadow-2xl border border-gray-100 rounded-2xl p-6 min-w-[500px] flex gap-8"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold uppercase text-black mb-4">BAEL 91 mod 99</p>
                    <div className="grid gap-1">
                      {NAV_LINKS.bael.map(link => (
                        <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-md transition-all flex items-center">
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="w-px bg-slate-100" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold uppercase text-black mb-4">Géotechnique</p>
                    <div className="grid gap-1">
                      {NAV_LINKS.geo.map(link => (
                        <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-md transition-all">
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bouton Mobile Toggle */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden p-2 text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Menu Mobile - Animation Drop-Down */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[120] pt-24 px-8 pb-10 md:hidden flex flex-col overflow-y-auto"
          >
            <div className="space-y-10">
              {/* Liens principaux mobile */}
              <div className="flex flex-col space-y-6">
                <Link href="/" onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-slate-900">Accueil</Link>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">À propos</Link>
              </div>

              {/* Sections d'outils mobile */}
              <div>
                <p className="text-blue-600 font-semibold uppercase text-sm tracking-widest mb-6">BAEL 91 mod 99</p>
                <div className="grid gap-6">
                  {NAV_LINKS.bael.map(link => (
                    <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-lg text-slate-700 font-semibold flex items-center justify-between group">
                      {link.name}
                      <ChevronRight className="w-5 h-5 text-blue-600" />
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-blue-600 font-semibold uppercase text-sm tracking-widest mb-6">Géotechnique</p>
                <div className="grid gap-6">
                  {NAV_LINKS.geo.map(link => (
                    <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-lg text-slate-700 font-semibold flex items-center justify-between">
                      {link.name}
                      <ChevronRight className="w-5 h-5 text-blue-600" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}