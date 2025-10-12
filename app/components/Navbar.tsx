'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-black px-6 sm:px-12 py-3 shadow-sm z-20 relative">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">CivilTools</Link>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-10 text-lg">
          <Link href="/" className="hover:text-blue-600">Accueil</Link>
          <Link href="/about" className="hover:text-blue-600">À propos</Link>

          {/* Dropdown */}
          <div className="relative group">
            <button className="hover:text-blue-600 focus:outline-none py-2">
              Outils ▾
            </button>
            <div className="absolute right-0 top-full hidden bg-white shadow-lg p-8 min-w-max z-20 rounded-md group-hover:flex justify-between">

              <div className='flex flex-col gap-2'>
                <p className='mb-2 font-semibold cursor-default'>BAEL 91 mod 99</p>

                <Link href="/bael/dalle" className="block hover:text-blue-600">Dalle en béton armé</Link>
                <Link href="/bael/poutre" className="block hover:text-blue-600">Poutre en béton armé</Link>
                <Link href="/bael/poteau" className="block hover:text-blue-600">Poteau en béton armé</Link>
                <Link href="/bael/semelle-isolee" className="block hover:text-blue-600">Semelle isolée</Link>
                <Link href="/bael/semelle-filante" className="block hover:text-blue-600">Semelle filante</Link>
              </div>

              <div className="block w-px bg-gray-300 mx-8"></div>

              <div className='flex flex-col gap-2'>
                <p className=' mb-2 font-semibold cursor-default'>Géotechnique</p>

                <Link href="/geotechnique/correlations" className="block hover:text-blue-600">Corrélations</Link>
                <Link href="/geotechnique/fondation" className="block hover:text-blue-600">Fondation</Link>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu (shown when menuOpen is true) */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center text-lg">
          <Link href="/" className="block hover:text-blue-600">Accueil</Link>
          <Link href="/about" className="block hover:text-blue-600">À propos</Link>
          
          <div>
            <p className="font-normal">Outils ▾</p>
            <div className="mt-2 space-y-2">

              <p className='py-1 text-sm font-bold cursor-default'>BAEL 91 mod 99</p>

              <Link href="/bael/dalle" className="block hover:text-blue-600">Dalle en béton</Link>
              <Link href="/bael/poutre" className="block hover:text-blue-600">Poutre en béton</Link>
              <Link href="/bael/poteau" className="block hover:text-blue-600">Poteau en béton</Link>
              <Link href="/bael/semelle-isolee" className="block hover:text-blue-600">Semelle isolée</Link>
              <Link href="/bael/semelle-filante" className="block hover:text-blue-600">Semelle filante</Link>

              <p className='py-1 text-sm font-bold cursor-default'>Géotechnique</p>

              <Link href="/geotechnique/correlations" className="block hover:text-blue-600">Corrélations</Link>
              <Link href="/geotechnique/fondation" className="block hover:text-blue-600">Fondation</Link>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
