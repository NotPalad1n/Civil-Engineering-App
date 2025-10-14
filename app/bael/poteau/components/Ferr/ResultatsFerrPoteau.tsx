import { InlineMath } from 'react-katex';

interface Results {
  As?: number;
  AsFourni?: number;
  verification?: string;
}

interface ResultatsPoteauProps {
  results: Results | null;
}

export default function ResultatsFerrPoteau({ results}: ResultatsPoteauProps) {
  return (
    <div className="flex flex-col items-center mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          <InlineMath math={`\\textbf{Section d’acier nécessaire :}`}/>
          <InlineMath math={`${results.As}`} />
          <InlineMath math={`\\textbf{Section d’acier fourni :}`}/>
          <InlineMath math={`${results.AsFourni}`} />
          <InlineMath math={`\\text{${results.verification}}`} />
          
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
