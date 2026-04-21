import { InlineMath } from 'react-katex';

interface Results {
  As?: number;
  AsFourni?: number;
  verification?: string;
}

interface ResultatsProps {
  results: Results | null;
}

export default function ResultatsFerr({ results}: ResultatsProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>

          {/* Titre Principal */}
          <div className="w-full text-center border-b border-gray-700 pb-4 mb-6">
            <InlineMath math={`\\large \\textbf{Vérification de sections}`} />
          </div>

          {/* Section d’acier nécessaire */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{Section d’acier nécessaire :}`} />
            </div>
            <div className="text-center bg-gray-50 py-3 rounded">
              <InlineMath math={`A_{s} = ${results.As}~\\text{cm}^2`} />
            </div>
          </section>

          {/* Section d’acier fourni */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{Section d’acier fourni}`} />
            </div>
            <div className="text-center bg-gray-50 py-3 rounded">
              <InlineMath math={`A_{s} = ${results.AsFourni}~\\text{cm}^2`} />
            </div>
          </section>

          {/* Remarque */}
          <section className="w-full">
            <div className="text-left text-gray-800 font-bold mb-2 border-l-4 border-blue-600 pl-2">
              <InlineMath math={`\\text{Remarque}`} />
            </div>
            <div className="text-center bg-gray-50 py-3 rounded">
              <InlineMath math={`\\text{${results.verification}}`} />
            </div>
          </section>

        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
