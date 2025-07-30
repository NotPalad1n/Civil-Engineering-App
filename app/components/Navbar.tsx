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
            <div className="absolute right-0 top-full hidden  bg-white p-4 shadow-lg w-70 z-20 rounded-md group-hover:flex ">

              <div className='flex flex-col '>
                <p className='px-4 py-2 text-sm font-bold cursor-default'>BAEL 91 mod 99</p>

                <Link href="/dalle" className="block px-4 py-2 hover:text-blue-600">Dalle en béton armé</Link>
                <Link href="/poutre" className="block px-4 py-2 hover:text-blue-600">Poutre en béton armé</Link>
                <Link href="/poteau" className="block px-4 py-2 hover:text-blue-600">Poteau en béton armé</Link>
                <Link href="/semelle" className="block px-4 py-2 hover:text-blue-600">Semelle isolée</Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu (shown when menuOpen is true) */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center text-lg">
          <Link href="/" className="block hover:text-blue-500">Accueil</Link>
          <Link href="/about" className="block hover:text-blue-500">À propos</Link>
          
          <div>
            <p className="font-normal">Outils ▾</p>
            <div className="mt-2 space-y-2">

              <p className='py-1 text-sm font-bold cursor-default'>BAEL 91 mod 99</p>

              <Link href="/dalle" className="block hover:text-blue-600">Dalle en béton</Link>
              <Link href="/poutre" className="block hover:text-blue-600">Poutre en béton</Link>
              <Link href="/poteau" className="block hover:text-blue-600">Poteau en béton</Link>
              <Link href="/semelle" className="block hover:text-blue-600">Semelle isolée</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
