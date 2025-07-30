import { InlineMath } from 'react-katex';

interface Results {
  Asx?: number;
  Asy?: number;
  message?: string;
  suggestion?: string;
}

interface ResultatsSemelleProps {
  results: Results | null;
}

export default function ResultatsSemelle({ results }: ResultatsSemelleProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          {/* <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2> */}
          <InlineMath math={`\\textbf{Ferraillage de la semelle :}`}/>

          <InlineMath math={`\\text{Ferraillage // A}`}/>
          <InlineMath math={`A_{s//A} = ${results.Asx}~\\text{cm}^2`} />

          <InlineMath math={`\\text{Ferraillage // B}`}/>
          <InlineMath math={`A_{s//B} = ${results.Asy}~\\text{cm}^2`} />

          <InlineMath math={`\\textbf{Verification de la contrainte :}`}/>

          <InlineMath math={`\\text{${results.message}}`} />

          <InlineMath math={`\\textbf{Suggestion d’armature :}`}/>

          <InlineMath math={`\\text{${results.suggestion}}`} />
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
