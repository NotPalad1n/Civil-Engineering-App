import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--darkblue)] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
        {/* Logo / Description */}
        <div>
          <h2 className="text-xl font-semibold mb-2">CivilTools</h2>
          <p className="text-sm text-gray-400">
            Outils de calcul de ferraillage pour le génie civil.
          </p>
        </div>

        {/* Liens horizontaux */}
        <div className="flex flex-col gap-10 md:flex-row">

          <Link href="/" className="hover:text-blue-600 transition">Accueil</Link>
          
          <Link href="/about" className="hover:text-blue-600 transition">À propos</Link>

          <div>
            <h3 className="text-md font-semibold  mb-3">BAEL 91 mod 99</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/bael/dalle" className="hover:text-blue-600 transition">Dalle en béton armé</Link>
              </li>
              <li>
                <Link href="/bael/poutre" className="hover:text-blue-600 transition">Poutre en béton armé</Link>
              </li>
              <li>
                <Link href="/bael/poteau" className="hover:text-blue-600 transition">Poteau en béton armé</Link>
              </li>
              <li>
                <Link href="/bael/semelle-isolee" className="hover:text-blue-600 transition">Semelle isolée</Link>
              </li>
              <li>
                <Link href="/bael/semelle-filante" className="hover:text-blue-600 transition">Semelle filante</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold  mb-3">Géotechnique</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/geotechnique/correlations" className="hover:text-blue-600 transition">Corrélations</Link>
              </li>
              <li>
                <Link href="/geotechnique/fondation" className="hover:text-blue-600 transition">Fondation</Link>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* CopyRight */}

      <div className="text-center text-xs text-gray-400 mt-10">
        © 2025 CivilTools — Tous droits réservés.
      </div>
    </footer>
  );
}
