import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
        {/* Logo / Description */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">CivilTools</h2>
          <p className="text-sm text-gray-400">
            Outils de calcul de ferraillage pour le génie civil.
          </p>
        </div>

        {/* Liens horizontaux */}
        <div className="flex space-x-6 gap-10">
          <Link href="/" className="hover:text-white transition">Accueil</Link>
          <Link href="/about" className="hover:text-white transition">À propos</Link>
          <div>
            <h3 className="text-md font-semibold text-white mb-3">Outils</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dalle" className="hover:text-white transition">Dalle en béton armé</Link>
              </li>
              <li>
                <Link href="/poutre" className="hover:text-white transition">Poutre en béton armé</Link>
              </li>
              <li>
                <Link href="/poteau" className="hover:text-white transition">Poteau en béton armé</Link>
              </li>
              <li>
                <Link href="/semelle" className="hover:text-white transition">Semelle isolée</Link>
              </li>
            </ul>
          </div>
      </div>
        </div>

        

        {/* Outils */}


      <div className="text-center text-xs text-gray-500 mt-10">
        © 2025 CivilTools — Tous droits réservés.
      </div>
    </footer>
  );
}
