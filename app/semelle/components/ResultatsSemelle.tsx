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
    <div className="flex-1 mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3">
      {results ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2>

          <p><strong>A<sub>s//A</sub> ultime :</strong> {results.Asx} cm²</p>
          <p><strong>A<sub>s//B</sub> ultime :</strong> {results.Asy} cm²</p>

          <p className="whitespace-pre-line">{results.message}</p>
            
          <p><strong>Suggestion d’armature :</strong> {results.suggestion}</p>
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
