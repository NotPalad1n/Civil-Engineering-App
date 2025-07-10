import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white text-black px-12 py-2 shadow-sm z-10 relative">
      <div className=" mx-auto flex justify-between items-center">
        {/* Logo / name */}
        <div className="text-2xl font-bold">
          <Link href="/">CivilTools</Link>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-12 text-lg">
          <Link href="/" className="hover:text-blue-500">Accueil</Link>
          <Link href="/about" className="hover:text-blue-500">À propos</Link>

          {/* Dropdown ‑– CSS‑only, no JS required */}
          <div className="relative group">
            {/* Button (acts as hover / focus target) */}
            <button className="hover:text-blue-500 focus:outline-none py-2" >
              Outils ▾
            </button>

            {/* Menu */}
            <div
              className="
                absolute right-0 top-full
                hidden flex-col          
                rounded-md bg-white text-gray-800 shadow-lg w-60 z-10
                group-hover:flex         
                group-focus-within:flex  
              "
            >
              <Link
                href="/dalle"
                className="block px-4 py-2 hover:text-blue-500"
              >
                Dalle en béton armé
              </Link>
              <Link
                href="/poutre"
                className="block px-4 py-2 hover:text-blue-500"
              >
                Poutre en béton armé
              </Link>
              <Link
                href="/poteau"
                className="block px-4 py-2 hover:text-blue-500"
              >
                Poteau en béton armé
              </Link>
              <Link
                href="/semelle"
                className="block px-4 py-2 hover:text-blue-500"
              >
                Semelle isolée
              </Link>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}