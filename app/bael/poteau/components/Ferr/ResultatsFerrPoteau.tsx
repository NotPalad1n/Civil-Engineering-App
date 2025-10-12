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

export default function ResultatsFerrPoteau({ results}: ResultatsPoteauProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          {/* <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2> */}

          <InlineMath math={`\\textbf{Dimensions au cas carré :}`}/>

          <InlineMath math={`a = ${results.asq}~\\text{cm}`} />
          <InlineMath math={`b = ${results.bsq}~\\text{cm}`} />

          <InlineMath math={`\\textbf{Dimensions au cas rectangle :}`}/>

          <InlineMath math={`a = ${results.a}~\\text{cm}`} />
          <InlineMath math={`b = ${results.b}~\\text{cm}`} />
          
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
