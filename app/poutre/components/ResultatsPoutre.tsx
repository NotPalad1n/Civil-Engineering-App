interface Results {
  Ast?: number;
  Asc?: number;
  suggestion?: string;
}

interface ResultatsPoteauProps {
  results: Results | null;
}

export default function ResultatsPoutre({ results }: ResultatsPoteauProps) {
  return (
    <div className="flex-1 mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3">
      {results ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2>

          <p><strong>A<sub>st</sub> :</strong> {results.Ast} cm²</p>
          <p><strong>A<sub>sc</sub> :</strong> {results.Asc} cm²</p>
          
          <p><strong>Suggestion d’armature :</strong> {results.suggestion}</p>
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
