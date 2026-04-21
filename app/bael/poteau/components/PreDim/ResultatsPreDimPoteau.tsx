import { InlineMath } from 'react-katex';

interface Results {
  asq?: number;
  bsq?: number;
  a?: number;
  b?: number;
}

interface ResultatsPoteauProps {
  results: Results | null;
}

export default function ResultatsPreDimPoteau({ results}: ResultatsPoteauProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>

          {/* Titre Principal */}
          <div className="w-full text-center border-b border-gray-700 pb-4 mb-6">
            <InlineMath math={`\\large \\textbf{Prédimensionnement - Poteau}`} />
          </div>

          {/* I. Dimensions au cas carré */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{I. Dimensions au cas carré}`} />
            </div>
            <div className="text-center bg-gray-50 py-3 rounded">
              <InlineMath math={`a = ${results.asq}~\\text{cm ; } b = ${results.bsq}~\\text{cm}`} />
            </div>
          </section>

          {/* II. Dimensions au cas rectangle */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{II. Dimensions au cas rectangle}`} />
            </div>
            <div className="text-center bg-gray-50 py-3 rounded">
              <InlineMath math={`a = ${results.a}~\\text{cm ; } b = ${results.b}~\\text{cm}`} />
            </div>
          </section>
          
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
