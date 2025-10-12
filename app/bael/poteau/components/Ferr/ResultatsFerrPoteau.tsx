import { InlineMath } from 'react-katex';

interface Results {
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

          <InlineMath math={`${results.verification}`} />
          
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
