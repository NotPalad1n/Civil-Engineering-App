import Link from 'next/link';

export default function Hero() {
  return (
    <div className="z-10 flex flex-col items-center justify-center h-full text-center px-4 py-50">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">
        Des outils de génie civil simples et efficaces 
      </h1>
      <p className="text-lg sm:text-xl text-black mb-8">
        Calculez les sections de ferraillage pour les poteaux, poutres, dalles et semelles.
      </p>
      <Link href="#tools">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-300 cursor-pointer">
          Commencer les calculs
        </button>
      </Link>
    </div>
  );
}
