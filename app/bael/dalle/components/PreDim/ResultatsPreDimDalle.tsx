import { InlineMath } from 'react-katex';

interface Results {
  h?: number;
  lx?: number;
  ly?: number;
}

interface ResultatsDalleProps {
  results: Results | null;
}

export default function ResultatsPreDimDalle({ results }: ResultatsDalleProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          {/* Titre Principal */}
          <div className="w-full text-center border-b border-gray-700 pb-4 mb-6 hidden lg:block md:block">
            <InlineMath math={`\\large \\textbf{Prédimensionnement - Dalle pleine}`} />
          </div>

          {/* Titre Principal */}
          <div className="flex flex-col w-full text-center border-b border-gray-700 pb-4 mb-6 lg:hidden md:hidden">
            <InlineMath math={`\\large \\textbf{Prédimensionnement -}`} />
            <InlineMath math={`\\large \\textbf{Dalle pleine}`} />
          </div>

          {/* I. Dimensions */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{I. Dimensions de la dalle :}`} />
            </div>
            <div className="flex flex-col items-center bg-gray-50 py-3 rounded">
              <InlineMath math={`l_{x} = ${results.lx}~\\text{m ; } l_{y} = ${results.ly}~\\text{m}`} />
               <InlineMath math={`h = ${results.h}~\\text{cm}`} />
            </div>
          </section>
            
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
