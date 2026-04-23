'use client';

import Link from 'next/link';
import { HardHat, Mail, Share2, Code2 } from 'lucide-react';

const FOOTER_LINKS = {
  navigation: [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/about" },
  ],
  bael: [
    { name: "Dalle en béton", href: "/bael/dalle" },
    { name: "Poutre en béton", href: "/bael/poutre" },
    { name: "Poteau en béton", href: "/bael/poteau" },
    { name: "Semelle isolée", href: "/bael/semelle-isolee" },
    { name: "Semelle filante", href: "/bael/semelle-filante" },
  ],
  geotechnique: [
    { name: "Corrélations", href: "/geotechnique/correlations" },
    { name: "Fondation", href: "/geotechnique/fondation" },
  ]
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-6">
          
          {/* Section 1 : Branding - Centrée sur mobile, à gauche sur Desktop */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <Link href="/" className="flex items-center space-x-2 group w-fit">
              <span className="text-xl font-bold tracking-tight">
                CivilTools
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Plateforme d'outils de calcul spécialisés pour l'ingénierie civile, conformes aux règlements BAEL et Eurocodes.
            </p>
          </div>

          {/* Section 2 : Navigation Rapide - Centrée sur mobile, à gauche sur Desktop */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xs font-bold uppercase text-slate-500 mb-6">Navigation</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3 : Outils BAEL - Centrée sur mobile, à gauche sur Desktop */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xs font-bold uppercase text-slate-500 mb-6">BAEL 91 mod 99</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.bael.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4 : Géotechnique - Centrée sur mobile, à gauche sur Desktop */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xs font-bold uppercase text-slate-500 mb-6">Géotechnique</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.geotechnique.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barre de Copyright - Déjà configurée pour être centrée sur mobile */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 px-6">
          <p className="text-xs font-medium text-center md:text-left">
            © {new Date().getFullYear()} CivilTools — Conçu pour la précision technique.
          </p>
          <div className="flex items-center space-x-6 text-xs font-bold uppercase tracking-widest">
            <Link href="/terms" className="hover:text-white transition-colors">Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer> 
  );
}