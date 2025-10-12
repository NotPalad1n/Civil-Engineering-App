import { InlineMath } from 'react-katex';

interface Results {
  A?: number;
  B?: number;
  D?: number;
  H?: number;
}

interface ResultatsSemelleProps {
  results: Results | null;
}

export default function ResultatsPreDimSemelle({ results }: ResultatsSemelleProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          {/* <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2> */}

          <InlineMath math={`\\textbf{Dimensions de la semelle :}`}/>

          <InlineMath math={`A = ${results.A}~\\text{cm}^2`} />
          <InlineMath math={`B = ${results.B}~\\text{cm}^2`} />
          <InlineMath math={`D = ${results.D}~\\text{cm}^2`} />
          <InlineMath math={`H = ${results.H}~\\text{cm}^2`} />
            
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
