import { InlineMath } from 'react-katex';

interface Results {
  Ath?: number;
  As?: number;
  Amin?: number;
  Amax?: number;
  lambda?: number;
  suggestion?: string;
}

interface ResultatsPoteauProps {
  results: Results | null;
}

export default function ResultatsPoteau({ results }: ResultatsPoteauProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          {/* <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2> */}

          <InlineMath math={`\\textbf{Elancement :}`}/>
          <InlineMath math={`\\lambda = ${results.lambda}`} />

          <InlineMath math={`\\textbf{Sections d'acier :}`}/>
          <InlineMath math={`A_{th} = ${results.Ath}~\\text{cm}^2`} />
          <InlineMath math={`A_{min} = ${results.Amin}~\\text{cm}^2`} />
          <InlineMath math={`A_{max} = ${results.Amax}~\\text{cm}^2`} />

          <InlineMath math={`\\textbf{Section d'acier nécessaire :}`}/>
          <InlineMath math={`A_{s} = ${results.As}~\\text{cm}^2`} />

          <InlineMath math={`\\textbf{Suggestion d’armature :}`} />
          <InlineMath math={`\\text{${results.suggestion}}`}/>
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
