import Link from 'next/link';

export default function Hero() {
  return (
    <div className="z-10 flex flex-col items-center justify-center h-full text-center px-4 py-50">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">
        {/* Des outils de génie civil simples et efficaces */}
        Des outils de génie civil&nbsp;
        <span className="relative inline-block">
          <span className="relative z-10">simples</span>
          <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-600 rounded-full z-0"></span>
        </span>
        &nbsp;et&nbsp;
        <span className="relative inline-block">
          <span className="relative z-10">efficaces</span>
          <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-600 rounded-full z-0"></span>
        </span>
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
