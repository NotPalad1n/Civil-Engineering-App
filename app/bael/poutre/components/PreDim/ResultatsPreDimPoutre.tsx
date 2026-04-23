import { InlineMath } from 'react-katex';

interface Results {
  b?: number;
  h?: number;
}

interface ResultatsPoutreProps {
  results: Results | null;
}

export default function ResultatsPreDimPoutre({ results }: ResultatsPoutreProps) {
  return (
    <div className="flex flex-col items-center text-left mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 min-h-full w-full">
      {results ? (
        <>

          {/* Titre Principal */}
          <div className="w-full text-center border-b border-gray-700 pb-4 mb-6 hidden lg:block md:block">
            <InlineMath math={`\\large \\textbf{Prédimensionnement - Poutre}`} />
          </div>

          {/* Titre Principal */}
          <div className="flex flex-col w-full text-center border-b border-gray-700 pb-4 mb-6 lg:hidden md:hidden">
            <InlineMath math={`\\large \\textbf{Prédimensionnement -}`} />
            <InlineMath math={`\\large \\textbf{Poutre}`} />
          </div>

          {/* I. Dimensions de la poutre */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{Dimensions de la poutre}`} />
            </div>
            <div className="text-center bg-gray-50 py-3 rounded">
              <InlineMath math={`b = ${results.b}~\\text{cm ; } h = ${results.h}~\\text{cm}`} />
            </div>
          </section>
          
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
