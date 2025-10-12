import { InlineMath } from 'react-katex';

interface Results {
  h?: number;
}

interface ResultatsDalleProps {
  results: Results | null;
}

export default function ResultatsPreDimDalle({ results }: ResultatsDalleProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          {/* <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2> */}

          <InlineMath math={`\\textbf{Dimensions de la dalle :}`}/>

          <InlineMath math={`h = ${results.h}~\\text{cm}`} />
            
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
