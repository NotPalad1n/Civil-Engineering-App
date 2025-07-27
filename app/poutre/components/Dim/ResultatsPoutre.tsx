interface Results {
  Ast?: number;
  Asc?: number;
  Asts?: number;
  Ascs?: number;
  Stmax?: number;
  St?: number;
  phiT?: number;
  message?: string;
  suggestion?: string;
}

interface ResultatsPoutreProps {
  results: Results | null;
}

export default function ResultatsPoutre({ results }: ResultatsPoutreProps) {
  return (
    <div className="flex-1 mt-10 lg:mt-0 bg-gray-100 p-6 rounded space-y-3 h-full">
      {results ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Résultats</h2>
          <p><strong>ELU :</strong></p>

          <p><strong>A<sub>st</sub> ultime :</strong> {results.Ast} cm²</p>
          <p><strong>A<sub>sc</sub> ultime :</strong> {results.Asc} cm²</p>

          <p><strong>ELS :</strong></p>

          <p><strong>A<sub>st</sub> service :</strong> {results.Asts} cm²</p>
          <p><strong>A<sub>sc</sub> service :</strong> {results.Ascs} cm²</p>

          <p><strong>Effort tranchant :</strong></p>

          <p><strong>S<sub>tmax</sub> :</strong> {results.Stmax} cm</p>
          <p><strong>S<sub>t</sub> :</strong> {results.St} cm</p>
          <p><strong>Φ<sub>t</sub> :</strong> {results.phiT} mm</p>
          <p className="whitespace-pre-line">{results.message}</p>
            
          <p><strong>Suggestion d’armature :</strong> {results.suggestion}</p>
        </>
      ) : (
        <p className="text-center text-gray-500">Remplissez le formulaire et cliquez sur calculer.</p>
      )}
    </div>
  );
}
