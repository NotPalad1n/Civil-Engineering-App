'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ChevronRight } from 'lucide-react';

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

const NAV_LINKS = {
  bael: [
    { name: "Dalle pleine", href: "/bael/dalle" },
    { name: "Poutre en béton armé", href: "/bael/poutre" },
    { name: "Poteau en béton armé", href: "/bael/poteau" },
    { name: "Semelle isolée centrée", href: "/bael/semelle-isolee" },
    { name: "Semelle filante centrée", href: "/bael/semelle-filante" },
  ],
  geo: [
    { name: "Corrélations", href: "/geotechnique/correlations" },
  ]
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Gestion de la réduction au scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-300 border-b bg-white dark:bg-slate-950 ${
        scrolled 
          ? "py-2 border-slate-200 dark:border-slate-800/80 shadow-md shadow-slate-100/5 dark:shadow-none" 
          : "py-4 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.span 
            whileHover={{ scale: 1.02 }}
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
          >
            CivilTools
          </motion.span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/" active={pathname === "/"}>Accueil</NavLink>
          <NavLink href="/about" active={pathname === "/about"}>À propos</NavLink>

          {/* Mega Dropdown Desktop */}
          <div 
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button className="flex items-center space-x-1 text-md font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-600 py-2 transition-colors cursor-pointer">
              <span>Outils de calcul</span>
              <motion.div animate={{ rotate: toolsOpen ? 180 : 0 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence>
              {toolsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.98 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 15, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 rounded-2xl p-6 min-w-[520px] flex gap-8 z-[150]"
                >
                  <div className="flex-1 text-left">
                    <p className="text-xs font-bold uppercase text-blue-600 dark:text-blue-600 mb-4 tracking-widest">BAEL 91 mod 99</p>
                    <div className="grid gap-1">
                      {NAV_LINKS.bael.map(link => (
                        <DropdownLink key={link.href} href={link.href}>{link.name}</DropdownLink>
                      ))}
                    </div>
                  </div>
                  <div className="w-px bg-slate-100 dark:bg-slate-800" />
                  <div className="flex-1 text-left">
                    <p className="text-xs font-bold uppercase text-blue-600 dark:text-blue-600 mb-4 tracking-widest">Géotechnique</p>
                    <div className="grid gap-1">
                      {NAV_LINKS.geo.map(link => (
                        <DropdownLink key={link.href} href={link.href}>{link.name}</DropdownLink>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bouton Toggle Theme Desktop */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-600 transition-all border border-slate-200/60 dark:border-slate-800/80 cursor-pointer"
          >
            <motion.div
              animate={{ rotate: theme === 'dark' ? 360 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.div>
          </button>
        </div>

        {/* Commandes d'action sur Mobile (Bouton thème + Menu burger) */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/80 cursor-pointer"
          >
            <motion.div
              animate={{ rotate: theme === 'dark' ? 360 : 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 12 }}
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.div>
          </button>

          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="p-2 text-slate-900 dark:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors relative z-[140]"
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile complet à tiroir */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 bg-white dark:bg-slate-950 z-[120] pt-24 px-6 md:hidden flex flex-col overflow-y-auto pb-12 transition-colors duration-300"
          >
            <div className="space-y-8 text-left">
              
              {/* Liens de premier plan */}
              <div className="flex flex-col space-y-4">
                <Link href="/" onClick={() => setMenuOpen(false)} className="text-xl font-bold text-slate-900 dark:text-slate-50 hover:text-blue-600 dark:hover:text-blue-600 transition-colors">
                  Accueil
                </Link>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="text-xl font-bold text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-800 pb-4 hover:text-blue-600 dark:hover:text-blue-600 transition-colors">
                  À propos
                </Link>
              </div>

              {/* Section Mobile : BAEL */}
              <div>
                <p className="text-blue-600 dark:text-blue-600 font-bold uppercase text-xs tracking-widest mb-4">
                  BAEL 91 mod 99
                </p>
                <div className="grid gap-3">
                  {NAV_LINKS.bael.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setMenuOpen(false)} 
                      className="text-md text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-between group py-1"
                    >
                      <span className="group-hover:text-blue-600 dark:group-hover:text-blue-600 transition-colors">{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-600 transition-all group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Section Mobile : Géotechnique */}
              <div>
                <p className="text-blue-600 dark:text-blue-600 font-bold uppercase text-xs tracking-widest mb-4">
                  Géotechnique
                </p>
                <div className="grid gap-3">
                  {NAV_LINKS.geo.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setMenuOpen(false)} 
                      className="text-md text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-between group py-1"
                    >
                      <span className="group-hover:text-blue-600 dark:group-hover:text-blue-600 transition-colors">{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-600 transition-all group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link href={href} className="relative py-2 text-md font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-600 transition-colors group">
      {children}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-600"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        animate={{ width: active ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}

function DropdownLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800/50 p-2.5 rounded-xl transition-all">
      {children}
      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </Link>
  );
}